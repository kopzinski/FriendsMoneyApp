angular.module('starter.controller.groups', ['starter.service'])

.controller('GroupsCtrl', function(groupsService, localStorage, $ionicModal, $scope, $cordovaNetwork, $cordovaToast, ContactsService, $cordovaContacts) {

     $ionicModal.fromTemplateUrl('templates/groups/groups.modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
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
        var user =  localStorage.getObject("user");
        var phone = user.data.phone.value;

        members.push({name: user.data.name, phone:{value: phone}});          

        groupsService.createGroup(members, registerForm.title, phone).then(function(response){
          console.log(response);           
        })

      }

      $scope.openGroupsModal = function(){
        console.log($scope.modal);
        /*$scope.users = [{
        "name":"Adrian",
        "phone":{"value":"97412487"}
    },
    {
        "name":"Joao",
        "phone":{"value":"82158998"}
    },
    {
        "name":"Guilherme",
        "phone":{"value":"97262289"}
    }]*/
        $scope.modal.show();
      }
})
