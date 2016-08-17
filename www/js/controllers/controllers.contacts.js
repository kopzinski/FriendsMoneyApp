angular.module('starter.controller.contact', ['starter.service'])

.controller('ContactCtrl', function($cordovaToast, $ionicHistory, $scope, $state, $ionicModal, localStorage, $timeout, $cordovaContacts, $ionicLoading, ContactsService, registerService) {
  
      $scope.doRefresh = function() {
        function onSuccess(contacts) {
           ContactsService.setContact(contacts).then(function(responses){            
            $scope.phoneContacts = responses; 
            $scope.$broadcast('scroll.refreshComplete');
            $cordovaToast.showShortBottom('Atualizado');
          })
        }
        function onError(contactError) {
            alert(contactError);
          };
          var options = {};
          options.filter = "";
          options.hasPhoneNumber = true;
          options.multiple = true;
          $cordovaContacts.find(options).then(onSuccess, onError);        
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

      $scope.getContacts = function(){
        $scope.showLoading();
        function onSuccess(contacts) {
           ContactsService.setContact(contacts).then(function(responses){            
              $scope.phoneContacts = responses;              
              $scope.hideLoading();
          })
        }
        function onError(contactError) {
            alert(contactError);
          };
          var options = {};
          options.filter = "";
          options.hasPhoneNumber = true;
          options.multiple = true;
          $cordovaContacts.find(options).then(onSuccess, onError);
      }  
      

      $ionicModal.fromTemplateUrl('templates/contact/modal.contact.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modal = modal;
      });  

      $scope.debitorRegister = function(index){
        $scope.modal.show();
        $scope.contact = index;
      }
      $scope.transaction = {};
      $scope.registerTransaction = function(person, valueForm){  

        var flag = $scope.contact.registrationFlag;
        var phone = "";       
        var value = valueForm.value;
        var userStorage =  localStorage.getObject("user"); 

        if(value){         
                if(flag == true){
                  phone = $scope.contact.phone.value;
                  var user = $scope.contact;
                  if(person == 'creditor'){
                    var transaction = {
                      value: value,
                      debtor: user,
                      creator: userStorage.data,
                      creditor: userStorage.data,
                      status: 'pending'
                    }
                  }else{
                    var transaction = {
                      value: value,
                      debtor: userStorage.data,
                      creator: userStorage.data,
                      creditor: user,
                      status: 'pending'
                    }
                  }
                  

                  ContactsService.registerTransactionWithFlag(transaction).then(function(response){
                    
                      $scope.modal.hide();
                      $scope.transaction.value = ""
                      console.log("Passou, transaction with flag = true");
                  })

                }else{
                  phone = $scope.contact.phone[0].value;      

                  var user = {
                    phone: {value:phone}
                  }
                  if(person == 'creditor'){
                    var transaction = {
                      value: value,
                      debtor: user,
                      creator: userStorage.data,
                      creditor: userStorage.data,
                      status: 'pending'
                    }
                  }else{
                     var transaction = {
                      value: value,
                      debtor: userStorage.data,
                      creator: userStorage.data,
                      creditor: user,
                      status: 'pending'
                    }
                  } 
                  ContactsService.registerTransactionWithNoFlag(transaction).then(function(response){
                    $scope.modal.hide();
                    $scope.transaction.value = "";
                    console.log("Passou, transaction with flag = false");
                  })          
                }
        
        }else{
          $scope.error_contact = "Inválido";
        }     
    
      }
})
