angular.module('starter.controller.timeline', ['starter.service', 'relativeDate'])

.controller('TimelineCtrl', function($cordovaToast, $ionicHistory, $scope, $state, $ionicModal, localStorage, $timeout, $cordovaContacts, $ionicLoading, timelineService ) {
  
      $scope.doRefresh = function() {       
        $scope.$broadcast('scroll.refreshComplete');
        $cordovaToast.showShortBottom('Atualizado');
        var user =  localStorage.getObject("user");
         var phone = user.data.phone.value;
         $scope.phone = phone;
         timelineService.getAllTransactions(phone).then(function(response){
            console.log(response);
            $scope.transactions = response;
         })  
      };

      $scope.onInit = function(){
         var user =  localStorage.getObject("user");
         var phone = user.data.phone.value;
         $scope.phone = phone;
         timelineService.getAllTransactions(phone).then(function(response){
            console.log(response);
            $scope.transactions = response;
         })
      } 
})
