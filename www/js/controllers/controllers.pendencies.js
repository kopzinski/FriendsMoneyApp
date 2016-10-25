angular.module('starter.controller.pendencies', ['starter.service', 'relativeDate','angular.filter'])
.controller('ControllerPendencies', function(groupsService, FileService,$cordovaToast,$cordovaNetwork, $window, $location, localStorage, $scope, $ionicModal, $ionicLoading, pendencieService) {
    var user =  localStorage.getObject("user");
    var phone = user.data.phone.value;
    $scope.phone = user.data.phone.value;
    
$scope.$on("$ionicView.enter", function(event, data){
    $scope.showLoading();
     // handle event
    $scope.getPendencies = function(phone){
      if($cordovaNetwork.isOnline() == true){
        FileService.checkFileByFile("pendencies.json").then(function(response){
          //online com cache
            if (response){
              FileService.readAsText("pendencies.json").then(function (pendenciesList) {
                $scope.pendencies = JSON.parse(pendenciesList);
                $scope.hideLoading();
                pendencieService.getPendings(phone).then(function(pendenciesListAPI){
                  if(pendenciesListAPI){
                    FileService.removeAndCreateAndWrite("pendencies.json", pendenciesListAPI).then(function(resp){
                        console.log("excluiu, criou, populou");                                 
                    }); 
                  }else{
                    FileService.removeFile("pendencies.json").then(function(resp){
                      console.log("excluiu arquivo");                                 
                  }); 
                    
                  }
                })
              })
              //online sem cache
            }else {
              
                pendencieService.getPendings(phone).then(function(pendenciesList){
                if(pendenciesList){
                  console.log("//online sem cach pendenciesList");
                  $scope.pendencies = pendenciesList; 
                  $scope.hideLoading(); 
                  FileService.removeAndCreateAndWrite("pendencies.json", pendenciesList).then(function(resp){
                      console.log("excluiu, criou, populou");                                 
                  }); 
                }else{
                  console.log("//online sem cach else");
                  $scope.hideLoading();
                  FileService.removeFile("pendencies.json").then(function(resp){
                      console.log("excluiu arquivo");                                 
                  }); 
                }
              })
            }                                    
        })
        //Offline com cache
      }else{
        FileService.checkFileByFile("pendencies.json").then(function(response){
          if(response){
            FileService.readAsText("pendencies.json").then(function (pendenciesList) {
              $scope.pendencies = JSON.parse(pendenciesList);
              $scope.hideLoading();
            })
            //Offline sem cache
          }else{
            $scope.hideLoading();
            $cordovaToast.showShortBottom('Não foi possível atualizar, sem conexão com internet');
          }
        })
      }     
    }
$scope.getPendencies(phone);
});

$scope.doRefresh = function(phone){
  if($cordovaNetwork.isOnline() == true){
    pendencieService.getPendings(phone).then(function(pendenciesList){
      if(pendenciesList){
                  $scope.pendencies = pendenciesList;
                  $scope.$broadcast('scroll.refreshComplete');
                  $cordovaToast.showShortBottom('Atualizado');  
                  FileService.removeAndCreateAndWrite("pendencies.json", pendenciesList).then(function(resp){
                      console.log("excluiu, criou, populou");                                 
                  }); 
                }else{
                  $scope.$broadcast('scroll.refreshComplete');
                  $cordovaToast.showShortBottom('Atualizado');
                  FileService.removeFile("pendencies.json").then(function(resp){
                      console.log("excluiu arquivo");                                 
                  }); 
                }
    })
  }else {
    $scope.$broadcast('scroll.refreshComplete');
    $cordovaToast.showShortBottom('Não foi possível atualizar, sem conexão com internet');


  }
}

$scope.$on("$ionicView.beforeLeave", function(event, data){
    
  pendencieService.getPendings(phone).then(function(pendenciesListAPI){
                if(pendenciesListAPI){
                  FileService.removeAndCreateAndWrite("pendencies.json", pendenciesListAPI).then(function(resp){
                      console.log("excluiu, criou, populou");                                 
                  }); 
                  }else{
                    FileService.removeFile("pendencies.json").then(function(resp){
                      console.log("excluiu arquivo");                                 
                  });
                  }
  });
})

//Modal functions
$ionicModal.fromTemplateUrl('templates/pendencies/pendencies.transaction.modal.html', {
      scope: $scope,
      animation: 'slide-in-right'
   }).then(function(modal) {
      $scope.modalTransaction = modal;
   });

   $ionicModal.fromTemplateUrl('templates/pendencies/pendencies.group.modal.html', {
      scope: $scope,
      animation: 'slide-in-right'
   }).then(function(modal) {
      $scope.modalGroup = modal;
   });
	
   $scope.openTransactionModal = function(pending) {
     if($cordovaNetwork.isOnline() == true){
        console.log(pending);
        $scope.pending = pending;
        $scope.modalTransaction.show();
     }else{
        $cordovaToast.showShortBottom('Impossível realizar a ação, sem conexão.');
     }
   };

    $scope.openGroupModal = function(pending) {
     if($cordovaNetwork.isOnline() == true){
        console.log(pending);
        $scope.pending = pending;
        $scope.modalGroup.show();
     }else{
        $cordovaToast.showShortBottom('Impossível realizar a ação, sem conexão.');
     }
   };

   $scope.openGroupModalTransaction = function(pending, transaction) {
     if($cordovaNetwork.isOnline() == true){
        $scope.pending = pending;
        $scope.transaction = transaction;
        $scope.modalGroup.show();
     }else{
        $cordovaToast.showShortBottom('Impossível realizar a ação, sem conexão.');
     }
   };
	
   $scope.onDrag = function(){
      $scope.modalTransaction.hide();
      $scope.modalGroup.hide();
    }

   $scope.closeModal = function() {
      $scope.modalTransaction.hide();
      $scope.modalGroup.hide();
   };

//Modal Pendencie Transactions
$scope.changePendencieStatus = function(transaction, status){
     var newTransaction = transaction;
     newTransaction.status = status;
     //Transformar isso em função
     
    
      pendencieService.changeStatusTransaction(newTransaction).then(function(response){
          if (response.result == "success"){
            console.log("index",index);
            var index = $scope.pendencies.indexOf(transaction);
            $scope.modalTransaction.hide();
            $scope.pendencies.splice(index,1);
            $cordovaToast.showShortBottom('Alterado com sucesso');
             pendencieService.getPendings(phone).then(function(pendenciesList){
                if(pendenciesList){
                  FileService.removeAndCreateAndWrite("pendencies.json", pendenciesList).then(function(resp){
                      console.log("excluiu, criou, populou");                     
                  });           
                }else {
                  FileService.removeFile("pendencies.json").then(function(resp){
                      console.log("excluiu arquivo");                                 
                  }); 
                } 
            })
        }
    });
  };

  $scope.acceptGroupInvitation = function(pending){
    var index = $scope.pendencies.indexOf(pending);
      pendencieService.acceptGroup(phone, pending._id).then(function(resp){
         if (resp.result == "success"){
            $scope.pendencies.splice(index,1);
            $scope.modalGroup.hide();
            $cordovaToast.showShortBottom('Aceito com Sucesso');
            pendencieService.getPendings(phone).then(function(pendenciesList){
                if(pendenciesList){
                  FileService.removeAndCreateAndWrite("pendencies.json", pendenciesList).then(function(resp){
                      console.log("excluiu, criou, populou");                     
                  });           
                }else {
                  FileService.removeFile("pendencies.json").then(function(resp){
                      console.log("excluiu arquivo");                                 
                  }); 
                } 
            })
         }else {
           $cordovaToast.showShortBottom('erro:'+resp.message);
         }
      })
  };

  $scope.denyGroupInvitation = function(pending){
    var index = $scope.pendencies.indexOf(pending);
      pendencieService.denyGroup(phone, pending._id).then(function(resp){
         if (resp.result == "success"){
            $scope.pendencies.splice(index,1);
            $scope.modalGroup.hide();
            $cordovaToast.showShortBottom('Negado com Sucesso');
            pendencieService.getPendings(phone).then(function(pendenciesList){
                if(pendenciesList){
                  FileService.removeAndCreateAndWrite("pendencies.json", pendenciesList).then(function(resp){
                      console.log("excluiu, criou, populou");                     
                  });           
                }else {
                  FileService.removeFile("pendencies.json").then(function(resp){
                      console.log("excluiu arquivo");                                 
                  }); 
                } 
            })
         }else {
           $cordovaToast.showShortBottom('erro:'+resp.message);
         }
      })
  }

  $scope.acceptFinalizedGroup = function(pending){
    var index = $scope.pendencies.indexOf(pending);
    var group = pending._id;
    var user =  localStorage.getObject("user");
    var phone = user.data.phone.value;
    groupsService.acceptDeleteGroup(group, phone).then(function (response) {                 
      $cordovaToast.showShortBottom('Sucesso');   
      console.log(response);
      if(response){
        $scope.pendencies.splice(index,1);        
      }
      $scope.modalGroup.hide();
    })
  };

  $scope.denyFinalizedGroup = function(pending){
    
    var index = $scope.pendencies.indexOf(pending);
    var group = pending._id;    
    groupsService.denyDeleteGroup(group).then(function (response) {                 
      $cordovaToast.showShortBottom('Sucesso');   
      console.log(response);
      if(response){
        $scope.pendencies.splice(index,1);        
      }
      $scope.modalGroup.hide();
    })
  };

  $scope.acceptDeleteGroupTransaction = function(pending, transaction){
    var index = $scope.pendencies.indexOf(pending);
    if(pending && transaction){      
      groupsService.deleteTransactionGroup(pending._id, transaction._id, transaction.creditor.phone.value).then(function (response) {         
        if(response){
          $cordovaToast.showShortBottom('Sucesso');
          $scope.pendencies.splice(index,1);
        }
      })
    }
    $scope.modalGroup.hide();       
  };

  $scope.denyDeleteGroupTransaction = function(pending, transaction){    
      var user =  localStorage.getObject("user");
      var phone = user.data.phone.value;
      var index = $scope.pendencies.indexOf(transaction);
      pendencieService.denyGroupDeleteTransaction(pending._id, transaction._id).then(function(resp){
         if (resp.result == "success"){
            $scope.pendencies.splice(index,1);
            $scope.modalGroup.hide();
            $cordovaToast.showShortBottom('Negado com Sucesso');
            pendencieService.getPendings(phone).then(function(pendenciesList){
                if(pendenciesList){
                  FileService.removeAndCreateAndWrite("pendencies.json", pendenciesList).then(function(resp){
                      console.log("excluiu, criou, populou");                     
                  });           
                }else {
                  FileService.removeFile("pendencies.json").then(function(resp){
                      console.log("excluiu arquivo");                                 
                  }); 
                } 
            })
         }else {
           $cordovaToast.showShortBottom('erro:'+resp.message);
         }
      })

  }

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




});




