angular.module('starter.controller.pendencies', ['starter.service', 'relativeDate'])


.controller('ControllerPendencies', function(FileService, $cordovaToast, $cordovaNetwork, $window, $location, localStorage, $scope, $ionicModal, $timeout, $ionicLoading, PendeciesService) {
     

     $scope.getPendencies = function(){
       FileService.readAsText("pendencies.json").then(function(response){  
          console.log("entrou aqui");         
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
          PendeciesService.getListContacts(phone).then(function(responses){    
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
      animation: 'slide-in-up'
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

