angular.module('starter.controller.transaction',['starter.service', 'starter.service.file'])
.controller('TransactionController',['$scope',function($scope, localStorage, ContactsService, registerService ) {

    $scope.hideModal = function() {
          $scope.TransactionController.hide();
        };
        $scope.removeModal = function() {
          $scope.TransactionController.remove();
        };

      $scope.onDrag = function(){
        $scope.modal.hide();
      }
      
      $scope.transaction = {};
      $scope.registerTransaction = function(person, valueForm){
          alert($scope.teste); 
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
                    
                      $scope.TransactionController.hide();
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
                    $scope.TransactionController.hide();
                    $scope.transaction.value = "";
                    console.log("Passou, transaction with flag = false");
                  })          
                }
        }else{
          $scope.error_contact = "Inválido";
        }     
    
      }

}])


// .controller('TransactionModalCtrl', function($scope, $modalInstance, contactParameter){
//       alert(contactParameter);

// });