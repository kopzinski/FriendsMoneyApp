angular.module('register.controllers', ['starter.service'])

.controller('RegisterCtrl', function( $cordovaDevice, $window, $location, $ionicHistory, $scope, $state, $ionicModal, localStorage, $timeout, $cordovaContacts, $ionicLoading, ContactsService, registerService) {
      $scope.ph_numbr = /^[0-9]{2}[0-9]{8,9}$/;

      $ionicModal.fromTemplateUrl('templates/register/modal.register.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: false
      }).then(function(modal) {
        $scope.modal = modal;
      });  
      
      $scope.openModal = function(){
          $scope.modal.show();
      }
      
      $scope.closeModal = function(){
          console.log('passou');
          $location.path('/app/contact');
          $scope.modal.hide();
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
      }

      $scope.$on('$ionicView.enter', function() {        
          $scope.modal.show();
      });

      $scope.msg_error = "";
      $scope.register = function(user){ 
        if(user.name == "" || user.name == null || user.name == undefined){
          $scope.msg_error = "Digite um nome válido";
        }else if(user.phone.value == "" || user.phone.value == null || user.phone.value == undefined){
          $scope.msg_error = "Digite um telefone válido";
        }else{
          $scope.msg_error = "";
          $scope.uuid = $cordovaDevice.getUUID();
          registerService.setUser(user, $scope.uuid).then(function(response){
            localStorage.setObject('user', response);
            $scope.closeModal();
          })
        }
      }

})
