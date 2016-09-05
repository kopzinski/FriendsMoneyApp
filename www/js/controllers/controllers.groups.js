angular.module('starter.controller.groups', ['starter.service'])

.controller('GroupsCtrl', function($state, groupsService, localStorage, $ionicModal, $scope, $cordovaNetwork, $cordovaToast, ContactsService, $cordovaContacts) {

     $ionicModal.fromTemplateUrl('templates/groups/groups.modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modal = modal;
      })  
      

      $ionicModal.fromTemplateUrl('templates/groups/group.modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
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
        var user =  localStorage.getObject("user");
        var phone = user.data.phone.value;

        if(registerForm.title){
          members.push({name: user.data.name, phone:{value: phone}});          

          groupsService.createGroup(members, registerForm.title, phone).then(function(response){
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
          groupsService.getListGroups(phone).then(function(response){
            $scope.groups = response;    
            console.log(response);   
          })
        }else{
          $cordovaToast.showLongCenter('Não há grupos');
        } 

      }

      $scope.openGroups = function(group){
        $scope.titleGroup = group.title;
        $scope.modalGroup.show();
      }

      $scope.deleteGroup = function(){
        alert("apagar o grupo");
      }
})
