angular.module('starter', ['ionic', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.chat', {
    url: '/chat',
    views: {
      'menuContent': {
        templateUrl: 'templates/message.html',
        controller: 'MessageCtrl'
      }
    }
  })
  .state('app.newchat', {
    url: '/newchat',
    views: {
      'menuContent': {
        templateUrl: 'templates/new-message.html',
        controller: 'NewMessageCtrl'
      }
    }
  })
    ;
    $urlRouterProvider.otherwise("app/home");
})
