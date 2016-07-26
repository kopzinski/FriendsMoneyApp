angular.module('register.controllers', ['starter.service'])

.controller('RegisterCtrl', function( $ionicHistory, $scope, $state, $ionicModal, localStorage, $timeout, $cordovaContacts, $ionicLoading, ContactsService, registerService) {
  
      $ionicModal.fromTemplateUrl('templates/register/modal.register.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modal = modal;
      });  
      
      $scope.openModal = function(){
          $scope.modal.show();
      }
      
      $scope.closeModal = function(){
          $scope.modal.hide();
          $ionicHistory.nextViewOptions({
                disableBack: true
            });
          $state.go('app.contact');
      }


      $scope.$on('$ionicView.enter', function() {        
          $scope.modal.show();
      });

      var deviceInformation = ionic.Platform.device();
      
      $scope.register = function(user){
        registerService.setUser(user, deviceInformation.uuid).then(function(response){
          console.log("registrou");
          localStorage.setObject('user', response);
          $scope.modal.hide();
       })
      }

})
