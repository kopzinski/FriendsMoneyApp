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
          $location.path('/timeline');
          $scope.modal.hide();
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
      }

      $scope.$on('$ionicView.enter', function() {        
          $scope.modal.show();
      });

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

      $scope.msg_error = "";
       
      $scope.user = {
        name: '',
        phone : {value:''}   
      };
      $scope.register = function(userForm){           
          if (userForm.$valid){
            $scope.showLoading();
             $scope.uuid = $cordovaDevice.getUUID();      
            registerService.setUser($scope.user, $scope.uuid).then(function(response){
              if(response){
                localStorage.setObject('user', response);
                $scope.hideLoading(); 
                $scope.closeModal();
              }              
            })
          }   
      }

})
