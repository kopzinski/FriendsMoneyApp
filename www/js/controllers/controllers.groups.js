angular.module('starter.controller.groups', ['starter.service'])

.controller('GroupsCtrl', function($location,$rootScope, $state, GroupLocalService, groupsService, localStorage, $ionicModal, $scope, $cordovaNetwork, $cordovaToast, ContactsService, $cordovaContacts) {

     $ionicModal.fromTemplateUrl('templates/groups/groupsCreate.modal.html', {
        scope: $scope,
        animation: 'slide-in-right',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modal = modal;
      })  

      $scope.contactsOnLoad = function(){
        
        if($cordovaNetwork.isOnline() == true){
          function onSuccess(contacts) {        
            ContactsService.setContact(contacts).then(function(responses){
                $scope.users = responses;
                console.log($scope.cont);    
            });      
          }
          function onError(contactError) {
            alert(contactError);
          }
          var options = {};
          options.filter = "";
          if(ionic.Platform.isAndroid()){
                options.hasPhoneNumber = true;
          }          
          options.multiple = true;
          $cordovaContacts.find(options).then(onSuccess, onError); 
        }else{
          
          $cordovaToast.showShortBottom('Não foi possível atualizar, sem conexão');

        }  
      }

      $scope.addFriend = function(members, registerForm){
        console.log(members);
        
        var user =  localStorage.getObject("user");
        var phone = user.data.phone.value;

        if(registerForm.title){
          members.push({name: user.data.name, phone:{value: phone}});          

          var user={
            phone: phone,
            name: user.data.name
          }

          groupsService.createGroup(members, registerForm.title, user).then(function(response){
         
            console.log(response);          
            $scope.modal.hide(); 
          })
        }else{
          $cordovaToast.showLongCenter('É preciso ter um titulo para o grupo.');
        }      

      }

      $scope.openGroupsModal = function(){       
        $scope.modal.show();
      }
      
      $scope.listGroups = function(){
        var user =  localStorage.getObject("user");
        var phone = user.data.phone.value; 
        if(phone){    
          groupsService.getListGroups("+555197412487").then(function(response){
            console.log(response);   
            $scope.groups = response;  
          })
        }else{
          $cordovaToast.showLongCenter('Não há grupos');
        } 

      }
      $scope.groupDetail = function(group){
        GroupLocalService.setGroup(group);
        $state.go('tabs.transactions');
      }
      $scope.onDrag = function(){
        $scope.modal.hide();
      }

    $rootScope.$ionicGoBack = function() {
           $state.go('groups');
        };
})


.controller('GroupTransactionsCtrl', function($state, GroupLocalService , $ionicModal, groupsService, localStorage, $scope, $cordovaNetwork, $cordovaToast) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
      $scope.group = GroupLocalService.getGroup();
      console.log($scope.group);
  });

    $scope.onDrag = function(){
        $scope.modal.hide();
    }
    $scope.$on("$ionicView.enter", function(event, data){

    $scope.getListTransactionsGroup();
    })

    $scope.getListTransactionsGroup = function(){
       groupsService.getListTransactionsGroup($scope.group._id).then(function(response){
       $scope.transactions = response;
      })
    }

    $scope.doRefresh = function(){
      groupsService.getListTransactionsGroup($scope.group._id).then(function(response){
      $scope.transactions = response;
      $scope.$broadcast('scroll.refreshComplete');
      $cordovaToast.showShortBottom('Atualizado');  
      })
    }

    $scope.registerTransaction = function(idGroup, transaction){
      var user =  localStorage.getObject("user");
      var newUser = {
        phone: user.data.phone,
        name: user.data.name
      }
      
      groupsService.registerGroupTransaction(newUser, idGroup, transaction).then(function(response){
        console.log(response);
        $scope.getListTransactionsGroup();     
        $scope.modal.hide(); 
        $scope.transaction.valuePaid = "";
        $scope.transaction.description = "";
    })  
    }
    
    $scope.openTransactionModal = function(){
      $scope.modal.show();
    }

    $ionicModal.fromTemplateUrl('templates/groups/tabs/group.transaction.modal.html', {
        scope: $scope,
        animation: 'slide-in-right',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modal = modal;
      }) 

    $scope.deleteGroup = function(id){
        var user =  localStorage.getObject("user");
        var phone = user.data.phone.value;
        groupsService.deleteGroup(id, phone).then(function (response) {
          console.log(response);
        })   
      }

    $scope.expandText = function(){
      var element = document.getElementById("descriptionId");
      element.style.height =  element.scrollHeight + "px";
    }
})

.controller('GroupMembersCtrl', function($state, GroupLocalService , $ionicModal, groupsService, localStorage, $scope, $cordovaNetwork, $cordovaToast) {

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
      viewData.enableBack = true;
      $scope.group =  GroupLocalService.getGroup();
    });

})