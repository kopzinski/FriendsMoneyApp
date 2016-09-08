angular.module('starter.controller.pendencies', ['starter.service', 'relativeDate'])




.controller('ControllerPendencies', function(FileService,$cordovaToast,$cordovaNetwork, $window, $location, localStorage, $scope, $ionicModal, $ionicLoading, TransactionService) {
     $scope.getPendencies = function(){
       FileService.readAsText("pendencies.json").then(function(response){  
          response = JSON.parse(response);
          $scope.transactions = response;
          console.log($scope.transactions);                                                     
       });        
      }

    $scope.doRefresh = function() {
      console.log($cordovaNetwork.isOnline());
      if($cordovaNetwork.isOnline() == true){
 
      var user =  localStorage.getObject("user");
      var phone = user.data.phone.value;
      $scope.phone = phone;
          TransactionService.getListContacts(phone).then(function(responses){    
            FileService.removeAndCreateAndWrite("pendencies.json", responses).then(function(resp){
              console.log("excluiu, criou, populou");
              console.log(resp);                                                      
            });       
          });   
          $scope.$broadcast('scroll.refreshComplete');
          $cordovaToast.showShortBottom('Atualizado');     
            
      }else{
          $scope.$broadcast('scroll.refreshComplete');
          $cordovaToast.showShortBottom('Não foi possível atualizar, sem conexão');
      }         
    };


   $ionicModal.fromTemplateUrl('templates/transactions/pendencies.modal.html', {
      scope: $scope,
      animation: 'slide-in-right'
   }).then(function(modal) {
      $scope.modal = modal;
   });
	
   $scope.openModal = function(transaction) {
     if($cordovaNetwork.isOnline() == true){
        console.log(transaction);
        $scope.transaction = transaction;
        $scope.modal.show();
     }else{
        $cordovaToast.showShortBottom('Impossível realizar a ação, sem conexão.');
     }
     
   };
	
   $scope.onDrag = function(){
      $scope.modal.hide();
    }

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


  var user =  localStorage.getObject("user");
  var phone = user.data.phone.value;
  $scope.phone = phone;

   $scope.changePendencieStatus = function(transaction, status){
     var newTransaction = transaction;
     
     newTransaction.status = status
     
      TransactionService.changeStatusTransaction(newTransaction).then(function(response){
          $scope.closeModal();
      })
   }
});

