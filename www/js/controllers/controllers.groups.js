angular.module('starter.controller.groups', ['starter.service'])

.controller('GroupsCtrl', function($ionicModal, $scope) {

     $ionicModal.fromTemplateUrl('templates/groups/groups.modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.modal = modal;
      })  
      

      $scope.openGroupsModal = function(){
        console.log($scope.modal);
        $scope.modal.show();
      }
})
