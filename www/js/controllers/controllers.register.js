angular.module('register.controllers', ['starter.service'])

.controller('RegisterCtrl', function( $cordovaDevice, $window, $location, $ionicHistory, $scope, $state, $ionicModal, localStorage, $timeout, $cordovaContacts, $ionicLoading, ContactsService, registerService) {
      //$scope.ph_numbr = /^[0-9]{2}[0-9]{8,9}$/;
      $scope.nameRegex = /^([a-zA-Z ]){2,30}$/;
      $ionicModal.fromTemplateUrl('templates/register/modal.register.html', {
        scope: $scope,
        animation: 'slide-in-right',
        focusFirstInput: false
      }).then(function(modal) {
        $scope.modal = modal;
      });  
      
      $scope.openModal = function(){
          $scope.modal.show();
      }
      
      $scope.closeModal = function(){
          console.log('passou');
          $location.path('/app/timeline');
          $scope.modal.hide();
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
      }

      $scope.$on('$ionicView.enter', function() {        
          $scope.modal.show();
      });

      $scope.msg_error = "";
       
      $scope.user = {
        name: '',
        phone : {value:''}   
      };
      $scope.register = function(userForm){ 
          if (userForm.$valid){
             $scope.uuid = $cordovaDevice.getUUID();      
            registerService.setUser($scope.user, $scope.uuid).then(function(response){
              localStorage.setObject('user', response);
              $scope.closeModal();
            })
          }   
      }

})
