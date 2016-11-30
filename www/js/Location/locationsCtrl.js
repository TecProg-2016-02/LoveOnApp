angular.module('starter')

.controller('locationsCtrl', function($ionicPopup ,$scope, $state, $stateParams,
  $rootScope, $ionicLoading, serviceLogin, factoryLocations, factoryCheckins,
  factoryLocation, factoryCheckin, $cordovaGeolocation, $ionicPlatform) {

  $scope.allLocations = function() {
    $ionicLoading.show({
      template: 'Loading... <ion-spinner icon="android"></ion-spinner>'
    });
    
    origin = {};
    origin.latitude = 0;
    origin.longitude = 0;
    origin.latitude = $scope.lat;
    origin.longitude = $scope.long;
    
    factoryLocations.get({
      latitude:$scope.lat,
      longitude:$scope.long
    }, function(locations) {
      $ionicLoading.hide();
      
      $rootScope.locations = {};
      $rootScope.locations = locations;
      
      console.log($rootScope.locations);
      
      $ionicLoading.hide();
      
      $state.go('app.locations');
    }, function(error) {
      $ionicLoading.hide();
      
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Failure to communicate with the database'
      });
    })
  }
  $scope.checkins = function(auth_token) {
    factoryFavorites.get({
      auth_token: auth_token
    }, function(location) {
      $ionicLoading.hide();
      
      $rootScope.locations = location;
      
      console.log($rootScope.locations);
    }, function(error) {
      $ionicLoading.hide();
      
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Failure to communicate with the database'
      });
    })
  };

  $scope.viewLocation = function(params) {
    $ionicLoading.show({
      template: 'Loading... <ion-spinner icon="android"></ion-spinner>'
    });
    params.user_token = '';
    params.user_token = $rootScope.user.token;
    
    factoryLocation.save(params, function(location) {
      $ionicLoading.hide();
      
      console.log(location);
      
      $rootScope.loc = {};
      $rootScope.loc = location;
      
      console.log("location", location);
      
      $state.go('app.location');
    }, function(error) {
      $ionicLoading.hide();
      
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Location error loading!'
      });
    })

  };

  $scope.doCheckin = function(location) {
    var checkin = {};
    checkin.user_token = '';
    checkin.location_token = '';
    checkin.user_token = $rootScope.user.token;
    checkin.location_token = location.token;
    
    $ionicLoading.show({
      template: 'Loading... <ion-spinner icon="android"></ion-spinner>'
    });
    
    factoryCheckin.save(checkin, function(checkin) {
      $ionicLoading.hide();
      
      $scope.viewLocation(location);
      
      console.log("BF create", checkin);
    }, function(error) {
      $ionicLoading.hide();
      
      $ionicPopup.alert({
        title: 'Error!',
        template: 'Could not access this location!'
      });
      
      $state.go('app.locations');
    });
  }

  DEFAULT_PAGE_SIZE_STEP = 4;

  $scope.currentPage = 1;
  $scope.pageSize = 0;
  $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;

  $scope.loadNextPage = function(){
    $scope.currentPage++;
    $scope.pageSize = $scope.currentPage * DEFAULT_PAGE_SIZE_STEP;
  }

  $ionicPlatform.ready(function() {
       var posOptions = {
           enableHighAccuracy: true,
           timeout: 3000,
           maximumAge: 0
       };
       
       $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
           $scope.lat  = 0;
           $scope.long = 0;

           $scope.lat  = position.coords.latitude;
           $scope.long = position.coords.longitude;

           $ionicLoading.hide();

           console.log(position.coords);
       }, function(err) {
           $ionicLoading.hide();
           
           $ionicPopup.alert({
             title: 'GPS not available!',
             template: 'Please turn on your GPS so we can show nearby places.'
           });
           
           console.log(err);
       });
   });
})
