angular.module('starter.controller.contact', ['starter.service', 'starter.service.file'])

.controller('ContactCtrl', function($cordovaNetwork, $ionicPlatform, FileService, $cordovaToast, $cordovaFile, $ionicHistory, $scope, $state, $ionicModal, localStorage, $timeout, $cordovaContacts, $ionicLoading, ContactsService, registerService) {
  
      $scope.doRefresh = function() {
        if($cordovaNetwork.isOnline() == true){
          function onSuccess(contacts) {       

            if(ionic.Platform.isIOS() == true){
              var array = [];
              for(var i = 0; i < contacts.length; i++){
                var contact = { 
                  "id": contacts[i].id,
                  "rawId": contacts[i].rawId,
                  "displayName": contacts[i].name.givenName,
                  "name": [{ "formatted": contacts[i].name.formatted , "givenName":  contacts[i].name.givenName}],
                  "nickname": null,
                  "phoneNumbers": [{ "type": contacts[i].phoneNumbers[0].type, "value": contacts[i].phoneNumbers[0].value, "id": contacts[i].phoneNumbers[0].id, "pref": contacts[i].phoneNumbers[0].pref }] ,
                  "emails": null,
                  "addresses": null,
                  "ims": null,
                  "organizations": null,
                  "birthday": null,
                  "note": null,
                  "photos": null,
                  "categories": null,
                  "urls": null 
                };
                array.push(contact);
              }
              ContactsService.setContact(array).then(function(responses){
                responses = JSON.stringify(responses);
                $scope.cont = responses; 
                FileService.removeAndCreateAndWrite("contacts.json", responses).then(function(response){
                  console.log(response);                          
                });   
              }); 
              $scope.$broadcast('scroll.refreshComplete');
              $cordovaToast.showShortBottom('Atualizado');
            }else{
              ContactsService.setContact(contacts).then(function(responses){
                responses = JSON.stringify(responses);
                $scope.cont = responses;                  
                FileService.removeAndCreateAndWrite("contacts.json", responses).then(function(response){
                  console.log(response);                          
                });   
              });  
            } 
            $scope.$broadcast('scroll.refreshComplete');
            $cordovaToast.showShortBottom('Atualizado');                 
          }


          function onError(contactError) {
            alert(contactError);
          }
          var options = {};
          options.filter = "";
          if(ionic.Platform.isAndroid()){
                options.hasPhoneNumber = true;
          }          
          options.multiple = true;
          $cordovaContacts.find(options).then(onSuccess, onError); 
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
 
      $scope.createFile = function(){
        FileService.createFile("contacts.json").then(function(response){            
            console.log('criou o arquivo', response);
        })
      }

      $scope.writeFile = function(content){
        FileService.writeInAFile("contacts.json", content).then(function(response){            
            console.log('escreveu o arquivo');
        	  console.log(content);
        })
      }

      $scope.readFile = function(){     
        FileService.readAsText("contacts.json").then(function(response){      
            var teste = JSON.parse(response);
            console.log(response);
        })
      }

      $scope.checkFileByFile = function(){     
        FileService.checkFileByFile("contacts.json").then(function(response){      
            console.log(response);            
        })
      }

      $scope.removeFile = function(){     
        FileService.removeFile("contacts.json").then(function(response){      
            console.log('remove file', response);
        })
      }

      
      $scope.contactsOnLoad = function(){      
        FileService.readAsText("contacts.json").then(function(response){                                   
              response = JSON.parse(response);
              $scope.cont = response;
              console.log($scope.cont);                                    
        });
      }


      /*$scope.getContacts = function(){
        $scope.showLoading();
        function onSuccess(contacts) {        
           ContactsService.setContact(contacts).then(function(responses){
              FileService.removeAndCreateAndWrite("contacts.json", responses).then(function(response){
                console.log(response);
                           
              });   
          });
                  
          $scope.hideLoading();
        }

        function onError(contactError) {
            alert(contactError);
          };
          var options = {};
          options.filter = "";
          options.hasPhoneNumber = true;
          options.multiple = true;
          $cordovaContacts.find(options).then(onSuccess, onError);
      } */ 


      $scope.$on("$ionicView.enter", function(event, data){
          console.log("aqui");
          $scope.showLoading();
          // handle event
          $scope.getContacts = function(phone){
            if($cordovaNetwork.isOnline() == true){
              FileService.checkFileByFile("contacts.json").then(function(response){
                //online com cache
                if(response){
                  FileService.readAsText("contacts.json").then(function(response){                                   
                        response = JSON.parse(response);
                        $scope.cont = response;
                        console.log($scope.cont);
                        $scope.hideLoading();                          
                        function onSuccess(contacts) {  
                          if(ionic.Platform.isIOS() == true){
                            var array = [];
                            for(var i = 0; i < contacts.length; i++){
                              var contact = { 
                                "id": contacts[i].id,
                                "rawId": contacts[i].rawId,
                                "displayName": contacts[i].name.givenName,
                                "name": [{ "formatted": contacts[i].name.formatted , "givenName":  contacts[i].name.givenName}],
                                "nickname": null,
                                "phoneNumbers": [{ "type": contacts[i].phoneNumbers[0].type, "value": contacts[i].phoneNumbers[0].value, "id": contacts[i].phoneNumbers[0].id, "pref": contacts[i].phoneNumbers[0].pref }] ,
                                "emails": null,
                                "addresses": null,
                                "ims": null,
                                "organizations": null,
                                "birthday": null,
                                "note": null,
                                "photos": null,
                                "categories": null,
                                "urls": null 
                              };
                              array.push(contact);
                            }
                            ContactsService.setContact(array).then(function(responses){
                              if(responses){
                                responses = JSON.stringify(responses);                                                            
                                FileService.removeAndCreateAndWrite("contacts.json", responses).then(function(response){
                                  console.log(response);                          
                                });
                              }else{
                                FileService.removeFile("contacts.json").then(function(resp){
                                    console.log("excluiu arquivo");                                 
                                });
                              }
                                 
                            }); 
                            $scope.$broadcast('scroll.refreshComplete');
                            $cordovaToast.showShortBottom('Atualizado');
                          }else{
                            ContactsService.setContact(contacts).then(function(responses){
                              if(responses){  
                                                                                                                                                       
                                FileService.removeAndCreateAndWrite("contacts.json", responses).then(function(response){
                                  console.log(response);                          
                                });
                              }else{
                                FileService.removeFile("contacts.json").then(function(resp){
                                    console.log("excluiu arquivo");                                 
                                });;
                              }  
                            });  
                          } 
                        }
                        function onError(contactError) {
                          alert(contactError);
                        }
                        var options = {};
                        options.filter = "";
                        if(ionic.Platform.isAndroid()){
                              options.hasPhoneNumber = true;
                        }          
                        options.multiple = true;
                        $cordovaContacts.find(options).then(onSuccess, onError);
                  });

                //online sem cache
                }else{
                  function onSuccess(contacts) {  
                          if(ionic.Platform.isIOS() == true){
                            var array = [];
                            for(var i = 0; i < contacts.length; i++){
                              var contact = { 
                                "id": contacts[i].id,
                                "rawId": contacts[i].rawId,
                                "displayName": contacts[i].name.givenName,
                                "name": [{ "formatted": contacts[i].name.formatted , "givenName":  contacts[i].name.givenName}],
                                "nickname": null,
                                "phoneNumbers": [{ "type": contacts[i].phoneNumbers[0].type, "value": contacts[i].phoneNumbers[0].value, "id": contacts[i].phoneNumbers[0].id, "pref": contacts[i].phoneNumbers[0].pref }] ,
                                "emails": null,
                                "addresses": null,
                                "ims": null,
                                "organizations": null,
                                "birthday": null,
                                "note": null,
                                "photos": null,
                                "categories": null,
                                "urls": null 
                              };
                              array.push(contact);
                            }
                            ContactsService.setContact(array).then(function(responses){                              
                              if(responses){
                                responses = JSON.stringify(responses);
                                $scope.cont = responses;
                                console.log($scope.cont);  
                                $scope.hideLoading();                           
                                FileService.removeAndCreateAndWrite("contacts.json", responses).then(function(response){
                                  console.log(response);                          
                                });
                              }else{
                                FileService.removeFile("contacts.json").then(function(resp){
                                    console.log("excluiu arquivo");                                 
                                });
                                $scope.hideLoading();
                              } 
                            }); 
                            $scope.$broadcast('scroll.refreshComplete');
                            $cordovaToast.showShortBottom('Atualizado');
                          }else{
                            $scope.hideLoading();
                            ContactsService.setContact(contacts).then(function(responses){                              
                              if(responses){ 
                                $scope.cont = responses;
                                console.log($scope.cont);
                                $scope.hideLoading();                                                                                       
                                FileService.removeAndCreateAndWrite("contacts.json", responses).then(function(response){
                                  console.log(response);                          
                                });
                              }else{
                                $scope.hideLoading();
                                FileService.removeFile("contacts.json").then(function(resp){
                                    console.log("excluiu arquivo");                                 
                                });
                              }  
                            });  
                          } 
                        }
                        function onError(contactError) {
                          alert(contactError);
                        }
                        var options = {};
                        options.filter = "";
                        if(ionic.Platform.isAndroid()){
                              options.hasPhoneNumber = true;
                        }          
                        options.multiple = true;
                        $cordovaContacts.find(options).then(onSuccess, onError);
                }                                   
              })
            //Offline com cache
            }else{
              FileService.checkFileByFile("contacts.json").then(function(response){
                if(response){
                  FileService.readAsText("contacts.json").then(function(response){                                   
                    response = JSON.parse(response);
                    $scope.cont = response;
                    console.log($scope.cont);
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
      $scope.getContacts();
    });
      
    $scope.$on("$ionicView.beforeLeave", function(event, data){
      function onSuccess(contacts) {  
        if(ionic.Platform.isIOS() == true){
          var array = [];
          for(var i = 0; i < contacts.length; i++){
            var contact = { 
              "id": contacts[i].id,
              "rawId": contacts[i].rawId,
              "displayName": contacts[i].name.givenName,
              "name": [{ "formatted": contacts[i].name.formatted , "givenName":  contacts[i].name.givenName}],
              "nickname": null,
              "phoneNumbers": [{ "type": contacts[i].phoneNumbers[0].type, "value": contacts[i].phoneNumbers[0].value, "id": contacts[i].phoneNumbers[0].id, "pref": contacts[i].phoneNumbers[0].pref }] ,
              "emails": null,
              "addresses": null,
              "ims": null,
              "organizations": null,
              "birthday": null,
              "note": null,
              "photos": null,
              "categories": null,
              "urls": null 
            };
            array.push(contact);
          }
          ContactsService.setContact(array).then(function(responses){
            if(responses){
              responses = JSON.stringify(responses);                                                            
              FileService.removeAndCreateAndWrite("contacts.json", responses).then(function(response){
                console.log(response);                          
              });
            }else{
              FileService.removeFile("contacts.json").then(function(resp){
                  console.log("excluiu arquivo");                                 
              });
            }
                
          }); 
          $scope.$broadcast('scroll.refreshComplete');
          $cordovaToast.showShortBottom('Atualizado');
        }else{
          ContactsService.setContact(contacts).then(function(responses){
            if(responses){                                                                                            
              FileService.removeAndCreateAndWrite("contacts.json", responses).then(function(response){
                console.log(response);                          
              });
            }else{
              FileService.removeFile("contacts.json").then(function(resp){
                  console.log("excluiu arquivo");                                 
              });
            }  
          });  
        } 
      }
      function onError(contactError) {
        alert(contactError);
      }
      var options = {};
      options.filter = "";
      if(ionic.Platform.isAndroid()){
            options.hasPhoneNumber = true;
      }          
      options.multiple = true;
      $cordovaContacts.find(options).then(onSuccess, onError); 
    }) 

      

      $ionicModal.fromTemplateUrl('templates/contact/modal.contact.html', {
        scope: $scope,
        animation: 'slide-in-right',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modal = modal;
      });  



      $scope.onDrag = function(){
        $scope.modal.hide();
      }



      $scope.debitorRegister = function(index){
        if($cordovaNetwork.isOnline() == true){
          $scope.modal.show();
          $scope.contact = index;
        }else{
          $cordovaToast.showShortBottom('Impossível realizar a ação, sem conexão.');
        }        
      }
      $scope.transaction = {};

      $scope.registerTransaction = function(person, valueForm){  

        var flag = $scope.contact.registrationFlag;
        var phone = "";       
        var valueTotal = valueForm.valueTotal;
        var description = valueForm.description;
        var userStorage =  localStorage.getObject("user"); 

        if(valueTotal){         
                if(flag == true){
                  phone = $scope.contact.phone.value;
                  var user = $scope.contact;
                  if(person == 'creditor'){
                    var transaction = {
                      valueTotal: valueTotal,
                      description: description,
                      debtor: user,
                      creator: userStorage.data,
                      creditor: userStorage.data,
                      status: 'pending'
                    }
                  }else{
                    var transaction = {
                      valueTotal: valueTotal,
                      description: description,
                      debtor: userStorage.data,
                      creator: userStorage.data,
                      creditor: user,
                      status: 'pending'
                    }
                  }
                  

                  ContactsService.registerTransactionWithFlag(transaction).then(function(response){
                    
                      $scope.modal.hide();
                      $scope.transaction.valueTotal = ""
                      console.log("Passou, transaction with flag = true");
                  })

                }else{
                  phone = $scope.contact.phone[0].value;      

                  var user = {
                    phone: {value:phone}
                  }
                  if(person == 'creditor'){
                    var transaction = {
                      valueTotal: valueTotal,
                      description: description,
                      debtor: user,
                      creator: userStorage.data,
                      creditor: userStorage.data,
                      status: 'pending'
                    }
                  }else{
                     var transaction = {
                      valueTotal: valueTotal,
                      description: description,
                      debtor: userStorage.data,
                      creator: userStorage.data,
                      creditor: user,
                      status: 'pending'
                    }
                  } 
                  ContactsService.registerTransactionWithNoFlag(transaction).then(function(response){
                    $scope.modal.hide();
                    $scope.transaction.valueTotal = "";
                    console.log("Passou, transaction with flag = false");
                  })          
                }
        }else{
          $scope.error_contact = "Inválido";
        }     
    
      }
})