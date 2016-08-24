angular.module('starter.controller.timeline', ['starter.service', 'relativeDate'])

.controller('TimelineCtrl', function(FileService,TransactionService, $cordovaToast, $ionicHistory, $scope, $state, $ionicModal, localStorage, $timeout, $cordovaContacts, $ionicLoading, timelineService ) {
  
      $scope.doRefresh = function() {       
        $scope.$broadcast('scroll.refreshComplete');
        $cordovaToast.showShortBottom('Atualizado');
        var user =  localStorage.getObject("user");
         var phone = user.data.phone.value;
         $scope.phone = phone;
         timelineService.getAllTransactions(phone).then(function(response){
                  FileService.removeAndCreateAndWrite("timeline.json", response).then(function(resp){
                  console.log("excluiu, criou, populou");
                  console.log(resp);                           
            }); 
         })  
      };

      

      $scope.onInit = function(){
            var user =  localStorage.getObject("user");
            var phone = user.data.phone.value;
            $scope.phone = phone;
            FileService.readAsText("timeline.json").then(function(response){  
                  console.log("entrou aqui");         
                  response = JSON.parse(response);
                  $scope.transactions = response;
                                                     
            });
      }

      $ionicModal.fromTemplateUrl('templates/timeline/timeline.modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modal = modal;
      });  

      $scope.timelineModal  = function(transaction){
        $scope.transaction = transaction;
        $scope.valueToPay = transaction.value;
        if (transaction.status == 'accepted'){
            $scope.modal.show();
        }
        
      }

      $scope.payTransaction = function(transactionPaid){
            var value = transactionPaid.valuePaid;
            if ( value == $scope.transaction.value){
                  transactionPaid.status = "paymentConfirm";
                  TransactionService.changeStatusTransaction(transactionPaid).then(function(response){
                      $scope.modal.hide();
                      $scope.transaction.valuePaid = ""
                  })
            }else if ( value < $scope.transaction.value && value > 0){
                  alert("Valor parcial");
                  $scope.modal.close();
            }else {
                  $scope.error_transaction = "Valor inválido";
            }     
      }
})
