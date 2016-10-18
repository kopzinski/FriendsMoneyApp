angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tabs', {
    url: '/groups/tab',
    templateUrl: 'templates/groups/tabs/tabsController.html',
    abstract:true
  })

    .state('tabs.members', {
    url: '/groups/members',
    views: {
      'tabs-members': {
        controller: 'GroupMembersCtrl',
        templateUrl: 'templates/groups/tabs/group.members.html'
      }
    }
  })

  .state('tabs.transactions', {
    url: '/groups/transactions',
    views: {
      'tabs-transactions': {
        controller: 'GroupTransactionsCtrl',
        templateUrl: 'templates/groups/tabs/group.transactions.html'
      }
    }
  })


  .state('pendencies', {
    url: '/pendencies',
    controller: 'ControllerPendencies',
    templateUrl: 'templates/pendencies/pendencies.html'
  })



  .state('register', {
    url: '/register',
    templateUrl: 'templates/register/modal.register.html',
    controller: 'RegisterCtrl'
  })

.state('createGroupWizard', {
    url: '/group-wizard',
    templateUrl: 'templates/groups/creategroup.wizard.html',
    controller: 'GroupsCtrl'
  })

 .state('timeline', {
      url: '/timeline',
      templateUrl: 'templates/timeline/timeline.html',
      controller: 'TimelineCtrl'
    })

  .state('groups', {
    url: '/groups',
    templateUrl: 'templates/groups/group.html',
    controller: 'GroupsCtrl'
  })


  .state('contacts', {
      url: '/contact',
      templateUrl: 'templates/contact/contact.html',
      controller: 'ContactCtrl'
    });
    
  // if none of the above states are matched, use this as the fallback
 
  $urlRouterProvider.otherwise(function ($injector, $location){
    var user = window.localStorage["friendsMoney" + "user"];
    if(user){
      console.log("tem registro");
      $location.path('/timeline');
    }else{
      console.log("não tem registro");
      $location.path('/register');
      
    }
  });
});

