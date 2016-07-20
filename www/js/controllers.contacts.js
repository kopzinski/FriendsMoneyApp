angular.module('starter.controllers', ['starter.service'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaContacts, $ionicLoading, setContacts) {
  
   
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


      $scope.getContacts = function() {
        $scope.showLoading();
        setTimeout(function(){
           $scope.phoneContacts = setContacts.setContact(contacts);
           $scope.hideLoading();  
        },5000)

          function onError(contactError) {
            alert(contactError);
          };
          var options = {};
          options.multiple = true;
          $cordovaContacts.find(options).then(onSuccess, onError);

        };
});
