angular.module('starter.controller.timeline', ['starter.service'])

.controller('TimelineCtrl', function($cordovaToast, $ionicHistory, $scope, $state, $ionicModal, localStorage, $timeout, $cordovaContacts, $ionicLoading, timelineService ) {
  
      $scope.doRefresh = function() {       
        $scope.$broadcast('scroll.refreshComplete');
        $cordovaToast.showShortBottom('Atualizado');  
      };


      $scope.onInit = function(){
         var phone = '555197262289';
        $scope.phone = phone;
         timelineService.getAllTransactions(phone).then(function(response){
             console.log(response);
            $scope.transactions = response;

         })
      } 
})
