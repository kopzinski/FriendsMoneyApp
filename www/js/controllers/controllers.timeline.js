angular.module('starter.controller.timeline', ['starter.service', 'relativeDate'])
.controller('TimelineCtrl', function($cordovaNetwork, FileService, $cordovaToast, $ionicHistory, $scope, $state, $ionicModal, localStorage, $timeout, $cordovaContacts, $ionicLoading, timelineService, TransactionService ) {

  
      $scope.doRefresh = function() {    
         if($cordovaNetwork.isOnline() == true){            
            var user =  localStorage.getObject("user");
            var phone = user.data.phone.value;
            $scope.phone = phone;
            timelineService.getAllTransactions(phone).then(function(response){
                  FileService.removeAndCreateAndWrite("timeline.json", response).then(function(resp){
                        console.log("excluiu, criou, populou");
                        console.log(resp);                           
                  }); 
            }) 
            $scope.$broadcast('scroll.refreshComplete');
            $cordovaToast.showShortBottom('Atualizado');
         }else{
            $scope.$broadcast('scroll.refreshComplete');
            $cordovaToast.showShortBottom('Não foi possível atualizar, sem conexão');   
         }         
             
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
        $scope.valueToPay = transaction.valueTotal;
        if (transaction.status == 'accepted'){
            $scope.modal.show();
        }
        
      }

      $scope.payTransaction = function(transactionPaid){
            var user =  localStorage.getObject("user");
            var phone = user.data.phone.value;

            var valuePaid = transactionPaid.valuePaid;
            transactionPaid.status = "paymentConfirm";

           

            if ( valuePaid == $scope.transaction.valueTotal){
                  if (transactionPaid.debtor.phone.value == phone){
                        transactionPaid.debtor.senderConfirm = true;
                        transactionPaid.creditor.senderConfirm = false;
                  }else {
                        transactionPaid.debtor.senderConfirm = false;
                        transactionPaid.creditor.senderConfirm = true;
                  }

                  TransactionService.changeStatusTransaction(transactionPaid).then(function(response){
                      $scope.modal.hide();
                      $scope.transaction.valuePaid = ""
                  })
            }else if ( valuePaid < $scope.transaction.valueTotal && valuePaid > 0){
                  alert("Valor parcial");
                  
                  $scope.modal.close();
            }else {
                  $scope.error_transaction = "Valor inválido";
            }     
      }
})
