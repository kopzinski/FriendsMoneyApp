angular.module('starter.controller.groups', ['starter.service'])

.controller('GroupsCtrl', function($location, $state, GroupLocalService, groupsService, localStorage, $ionicModal, $scope, $cordovaNetwork, $cordovaToast, ContactsService, $cordovaContacts) {

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

          groupsService.getListGroups("5197262289").then(function(response){
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

})

.controller('GroupTransactionsCtrl', function($state, groupsService, localStorage, $scope, $cordovaNetwork, $cordovaToast) {
    
    $scope.deleteGroup = function(id){
        var user =  localStorage.getObject("user");
        var phone = user.data.phone.value;
        groupsService.deleteGroup(id, phone).then(function (response) {
          console.log(response);
        })   
      }
})

.controller('GroupMembersCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])