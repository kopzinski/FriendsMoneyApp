angular.module('starter.controller.groups', ['starter.service'])

.controller('GroupsCtrl', function($state, groupsService, localStorage, $ionicModal, $scope, $cordovaNetwork, $cordovaToast, ContactsService, $cordovaContacts) {

     $ionicModal.fromTemplateUrl('templates/groups/groups.modal.html', {
        scope: $scope,
        animation: 'slide-in-right',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modal = modal;
      })  
      

      $ionicModal.fromTemplateUrl('templates/groups/group.modal.html', {
        scope: $scope,
        animation: 'slide-in-right',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modalGroup = modal;
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
          console.log(phone); 
          groupsService.getListGroups(phone).then(function(response){
            console.log(response);   
            $scope.groups = response;  
          })
        }else{
          $cordovaToast.showLongCenter('Não há grupos');
        } 

      }

      $scope.openGroups = function(group){
        $scope.group = group;
        $scope.modalGroup.show();
      }

      $scope.deleteGroup = function(id){
        var user =  localStorage.getObject("user");
        var phone = user.data.phone.value;
        groupsService.deleteGroup(id, phone).then(function (response) {
          console.log(response);
        })   
      }

      $scope.onDrag = function(){
        $scope.modal.hide();
      }

      $scope.onDrag2 = function(){
        $scope.modalGroup.hide();
      }
})
