angular.module('starter.controller.timeline', ['starter.service', 'relativeDate'])
.controller('TimelineCtrl', function($timeout, $cordovaNetwork, FileService, $cordovaToast, $ionicHistory, $scope, $state, $ionicModal, localStorage, $timeout, $cordovaContacts, $ionicLoading, timelineService, pendencieService ) {

  
      $scope.doRefresh = function() {    
         if($cordovaNetwork.isOnline() == true){            
            var user =  localStorage.getObject('user');       
            var phone = user.data.phone.value;
            $scope.phone = phone;
            timelineService.getAllTransactions(phone).then(function(response){
                  $scope.transactions = response;                    
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


$scope.$on("$ionicView.enter", function(event, data){
     $scope.showLoading();
     console.log("ta aqui");
     // handle event
    $scope.getTimeline = function(){
      
      var user =  localStorage.getObject("user");
      var phone = user.data.phone.value;
      $scope.phone = phone;
      if($cordovaNetwork.isOnline() == true){
            console.log("ta online");
        FileService.checkFileByFile("timeline.json").then(function(response){
          //online com cache
            if (response){       
                  console.log("ta online e tem cache");           
                  FileService.readAsText("timeline.json").then(function(response){  
                        console.log("entrou aqui");         
                        response = JSON.parse(response);
                        $scope.transactions = response;  
                        $scope.hideLoading(); 
                        timelineService.getAllTransactions(phone).then(function(response){
                              if(response){
                                    FileService.removeAndCreateAndWrite("timeline.json", response).then(function(resp){
                                       
                                          console.log(resp);                           
                                    }); 
                              }else{
                                 
                                 FileService.removeFile("timeline.json").then(function(resp){
                                                                   
                                 });   
                              }
                              
                        })                                                  
                  });
              //online sem cache
            }else {
                  console.log("ta online e não tem cache"); 
                  timelineService.getAllTransactions(phone).then(function(response){                        
                        if(response){
                              $scope.transactions = response;
                              $scope.hideLoading();
                              FileService.removeAndCreateAndWrite("timeline.json", response).then(function(resp){
                                  
                                    console.log(resp);                           
                              }); 
                        }else{
                              $scope.hideLoading();
                              FileService.removeFile("timeline.json").then(function(resp){                                                        
                              });   
                        }
                        
                  })
            }                                    
        })
        //Offline com cache
            }else{
                  console.log("ta offline e tem cache"); 
                  FileService.checkFileByFile("timeline.json").then(function(response){
                        if(response){                  
                              FileService.readAsText("timeline.json").then(function(response){ 
                                    response = JSON.parse(response);
                                    $scope.transactions = response;
                                    $scope.hideLoading();                                                     
                              });
                              //Offline sem cache
                        }else{
                              $scope.hideLoading();
                              $cordovaToast.showShortBottom('Não foi possível atualizar, sem conexão com internet');
                        }
                  })
            }     
      }
      $timeout(function(){$scope.getTimeline();}, 1500);
   
});

$scope.$on("$ionicView.beforeLeave", function(event, data){
      var user =  localStorage.getObject("user");
      var phone = user.data.phone.value;
      $scope.phone = phone;
      timelineService.getAllTransactions(phone).then(function(response){
            if(response){
                  FileService.removeAndCreateAndWrite("timeline.json", response).then(function(resp){                        
                                                   
                  }); 
            }else{
                  FileService.removeFile("timeline.json").then(function(resp){
                                                 
                  });   
            }
      })
})



      /*$scope.onInit = function(){
            var user =  localStorage.getObject("user");
            var phone = user.data.phone.value;
            $scope.phone = phone;
            FileService.readAsText("timeline.json").then(function(response){  
                  console.log("entrou aqui");         
                  response = JSON.parse(response);
                  $scope.transactions = response;                                                     
            });
      }*/

      $ionicModal.fromTemplateUrl('templates/timeline/timeline.modal.html', {
        scope: $scope,
        animation: 'slide-in-right',
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

      $scope.onDrag = function(){
        $scope.modal.hide();
      }

      $scope.changeInput = function(transaction){
            if(transaction.check == true){
                  document.getElementById("val").disabled = true;
                  document.getElementById("val").value = transaction.valueTotal;                  
                  $scope.transaction.valuePaid = transaction.valueTotal;
            }else{
                  document.getElementById("val").disabled = false;
                  document.getElementById("val").value = 0;                                
                  $scope.transaction.valuePaid = 0;
            }
      }

      $scope.payTransaction = function(transactionPaid){
            var user =  localStorage.getObject("user");
            var phone = user.data.phone.value;
            var valuePaid = transactionPaid.valuePaid;
            transactionPaid.status = "paymentConfirm";
            if ( valuePaid > 0){
                  if (transactionPaid.debtor.phone.value == phone){
                        transactionPaid.debtor.senderConfirm = true;
                        transactionPaid.creditor.senderConfirm = false;
                  }else {
                        transactionPaid.debtor.senderConfirm = false;
                        transactionPaid.creditor.senderConfirm = true;
                  }

                  pendencieService.changeStatusTransaction(transactionPaid).then(function(response){
                      $scope.transaction.valuePaid = "";
                      $scope.modal.hide();                      
                  })
                   $scope.error_transaction = "";            
            }else {
                  $scope.error_transaction = "Valor inválido";
            }   
      }
})
