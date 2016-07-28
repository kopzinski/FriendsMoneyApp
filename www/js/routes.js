angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
  })

  .state('app.pendencies', {
    url: '/pendencies',
    views: {
      'menuContent': {
        controller: 'ControllerPendencies',
        templateUrl: 'templates/transactions/pendencies.html'
      }
    }
  })

  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/register/modal.register.html',
        controller: 'RegisterCtrl'
      }
    }
  })

 .state('app.timeline', {
      url: '/timeline',
      views: {
        'menuContent': {
          templateUrl: 'templates/timeline/timeline.html',
          controller: 'TimelineCtrl'
        }
      }
    })

  .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          templateUrl: 'templates/contact/contact.html',
          controller: 'ContactCtrl'
        }
      }
    });
    
  // if none of the above states are matched, use this as the fallback
 
  $urlRouterProvider.otherwise(function ($injector, $location){
    var user = window.localStorage["friendsMoney" + "user"];
    if(user){
      console.log("tem registro");
      $location.path('/app/contact');
    }else{
      console.log("não tem registro");
      $location.path('/app/register');
      
    }
  });
});

