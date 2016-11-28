
angular.module('starter', ['ionic', 'firebase', 'ngResource', 'ngCordova',
  'ionMdInput', 'ion-datetime-picker', 'ion-gallery', 'nl2br', 'ionic-datepicker'])

/*
*  Set link to databases
*  @param 'URL' Defines link type
*  @param 'link' Database address 
*/
.constant('URL', 'http://localhost:3000')
// .constant('URL', 'http://fd992ef2.ngrok.io')
//.constant('URL', 'http://loversappserver.herokuapp.com')

/*
*  This is to prevent further system configuration during application run time.
*  @param $ionicPlatform Defined variable for the ionic platform according to the DOM
*/
.run(function($ionicPlatform) {
  // Performs activities within the function if the ionic platform is ready
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

/*
*  This is to prevent accidental instantiation of services before they have been fully configured
*  @params All service variables for configuration
*/
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.backButton.previousTitleText(false).text('');
  $ionicConfigProvider.tabs.position('bottom');
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
    url: '/rooms/:roomId',
    views: {
      'menuContent': {
        templateUrl: 'templates/message.html',
        controller: 'UsersCtrl'
      }
    }
  })
  .state('app.newchat', {
    url: '/new',
    views: {
      'menuContent': {
        templateUrl: 'templates/new-message.html',
        controller: 'NewMessageCtrl'
      }
    }
  })
  .state('app.lobby', {
    url: '/lobby',
    views: {
      'menuContent': {
        templateUrl: 'templates/lobby.html',
        controller: 'LobbyCtrl'
      }
    }
  })
  .state('app.register', {
    url: '/registerEmail',
    views: {
      'menuContent': {
        templateUrl: 'templates/registerEmail.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.activateaccount', {
    url: '/activateAccount',
    views: {
      'menuContent': {
        templateUrl: 'templates/activateAccount.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.users', {
    url: '/users',
    views: {
      'menuContent': {
        templateUrl: 'templates/users.html',
        controller: 'UsersCtrl'
      }
    }
  })
  .state('app.locations', {
    url: '/locations',
    views: {
      'menuContent': {
        templateUrl: 'templates/locations.html',
        controller: 'locationsCtrl'
      }
    }
  })
  .state('app.location', {
    url: '/location',
    views: {
      'menuContent': {
        templateUrl: 'templates/location.html',
        controller: 'locationsCtrl'
      }
    }
  })
  .state('app.primeiraTelaEdit', {
    url: '/primeiraTelaEdit',
    views: {
      'menuContent': {
        templateUrl: 'templates/primeiraTelaEdit.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.segundaTelaEdit', {
    url: '/segundaTelaEdit',
    views: {
      'menuContent': {
        templateUrl: 'templates/segundaTelaEdit.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.matches', {
    url: '/matches',
    views: {
      'menuContent': {
        templateUrl: 'templates/matches.html',
        controller: 'UsersCtrl'
      }
    }
  })
  .state('app.editprofile', {
    url: '/editprofile',
    views: {
      'menuContent': {
        templateUrl: 'templates/editProfile.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.user', {
    url: '/user',
    views: {
      'menuContent': {
        templateUrl: 'templates/user.html',
        controller: 'UsersCtrl'
      }
    }
  })
  .state('app.notifications', {
    url: '/notifications',
    views: {
      'menuContent': {
        templateUrl: 'templates/notifications.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.followers', {
    url: '/followers',
    views: {
      'menuContent': {
        templateUrl: 'templates/followers.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.following', {
    url: '/following',
    views: {
      'menuContent': {
        templateUrl: 'templates/following.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.report', {
    url: '/report',
    views: {
      'menuContent': {
        templateUrl: 'templates/report.html',
        controller: 'UsersCtrl'
      }
    }
  })
  .state('app.terms', {
    url: '/terms',
    views: {
      'menuContent': {
        templateUrl: 'templates/terms.html',
        controller: 'LoginCtrl'
      }
    }
  })
  ;
  $urlRouterProvider.otherwise("app/home");
})

.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Ok',
      closeLabel: 'Fechar',
      mondayFirst: false,
      weeksList: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthsList: ["Jan", "Fev", "Mar", "Abril", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: false,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
