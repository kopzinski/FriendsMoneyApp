angular.module('starter.controller.pendencies', ['starter.service'])

.controller('ControllerPendencies', function($window, $location, localStorage, $scope, $ionicModal, $timeout, $ionicLoading, PendeciesService) {
      $scope.getTransactions = function(){
        var user =  localStorage.getObject("user");
        
        var phone = user.data.phone.value;
        
        PendeciesService.getListContacts(phone).then(function(responses){
            console.log(responses);
            $scope.transactions = responses;
        });
      }

   $ionicModal.fromTemplateUrl('templates/transactions/pendencies.modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
   }).then(function(modal) {
      $scope.modal = modal;
   });
	
   $scope.openModal = function(transaction) {
     console.log(transaction);
     $scope.transaction = transaction;
      $scope.modal.show();
   };
	
   $scope.closeModal = function() {
      $scope.modal.hide();
   };
	

   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });
	

   $scope.$on('modal.hidden', function() {

   });
	

   $scope.$on('modal.removed', function() {

   });
   $scope.changePendencieStatus = function(transaction, status){
     transaction.status = status
      PendeciesService.changeStatusPendencie(transaction).then(function(response){
        console.log(response);
        $scope.closeModal();
        $window.location.reload(true)
      })
   }
});

