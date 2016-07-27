angular.module('starter.controller.pendencies', ['starter.service'])

.controller('ControllerPendencies', function($window, $location, $scope, $ionicModal, $timeout, $ionicLoading, PendeciesService) {
    
    
    
    $scope.getTransactions = function(){
      PendeciesService.getListContacts("5197412487").then(function(responses){
          console.log(responses);
          $scope.transactions = responses;
      });
    }

    $scope.doRefresh = function() {
        
            PendeciesService.getListContacts("5197412487").then(function(responses){
              //alert(responses.transactions);
              $scope.transactions = responses;
              $scope.$broadcast('scroll.refreshComplete');
              $cordovaToast.showShortBottom('Atualizado');
          })          
           $scope.$broadcast('scroll.refreshComplete');
           $cordovaToast.showShortBottom('Atualizado');
    
               
      };

   

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

