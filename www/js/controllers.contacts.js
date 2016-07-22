angular.module('starter.controllers', ['starter.service'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaContacts, $ionicLoading, ContactsService) {
  
   
      $scope.showLoading = function() {
        //options default to values in $ionicLoadingConfig
        $ionicLoading.show().then(function(){          
          console.log("The loading indicator is now displayed");
        });
      };

      $scope.hideLoading = function(){
        $ionicLoading.hide().then(function(){
          console.log("The loading indicator is now hidden");
        });
      };

      $scope.getContacts = function()
      {
        $scope.showLoading();
        function onSuccess(contacts) {
           ContactsService.setContact(contacts).then(function(responses){            
                 $scope.phoneContacts = responses;              
              $scope.hideLoading();
          })
        }
        function onError(contactError) {
            alert(contactError);
          };
          var options = {};
          options.filter = "";
          options.hasPhoneNumber = true;
          options.multiple = true;
          $cordovaContacts.find(options).then(onSuccess, onError);
      }  

      $ionicModal.fromTemplateUrl('templates/contact/modal.contact.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modal = modal;
      });  

      $scope.debitorRegister = function(index){
        $scope.modal.show();
        $scope.contact = index;
      }

})
