angular.module('starter.controllers', ['starter.service'])

.controller('ContactCtrl', function($ionicHistory, $scope, $state, $ionicModal, localStorage, $timeout, $cordovaContacts, $ionicLoading, ContactsService, registerService) {
  
   
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

      $scope.getContacts = function()
      {
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


      $scope.registerTransaction = function(){  
  
        var flag = $scope.contact.registrationFlag;
        var phone = "";
       
        var value = document.getElementById('val').value;
        
        var userStorage =  localStorage.getObject("user"); 

        if(flag == true){
          phone = $scope.contact.phone.value;
          var user = $scope.contact;

          var transaction = {
            value: value,
            debtor: user,
            creator: userStorage.data,
            creditor: userStorage.data,
            status: 'pending'
          }

          ContactsService.registerTransactionWithFlag(transaction).then(function(response){
              console.log("Passou, transaction with flag = true");

          })

        }else{
          phone = $scope.contact.phone[0].value;      

          var user = {
            phone: {value:phone}
          }

          var transaction = {
            value: value,
            debtor: user,
            creator: userStorage.data,
            creditor: userStorage.data,
            status: 'pending'
          }

          ContactsService.registerTransactionWithNoFlag(user, transaction).then(function(response){
            console.log("Passou, transaction with flag = false");
          })
        
        }
    
      }





})
