angular.module('starter')

.controller('locationsCtrl', function($ionicPopup ,$scope, $state, $stateParams,
  $rootScope, $ionicLoading, serviceLogin, factoryLocations, factoryCheckins,
  factoryLocation, factoryCheckin) {

  $scope.allLocations = function() {
    factoryLocations.get(function(locations) {
      $ionicLoading.hide();
      $rootScope.locations = locations;
      console.log($rootScope.locations);
      $ionicLoading.hide();
      $state.go('app.locations');
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Falhou'
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
        title: 'Erro!',
        template: 'Falhou'
      });
    })
  };

  $scope.viewLocation = function(name) {
    factoryLocation.get({
      name: name
    }, function(location) {
      $ionicLoading.hide();
      console.log(location);
      $rootScope.loc = location;
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Falhou'
      });
    })

    $state.go('app.location');
  };

  $scope.doCheckin = function(location) {
    var checkin = {};

    checkin.user_token = serviceLogin.getUser().token;
    checkin.location_id = location.id;
    checkin.id = location.id;
    $ionicLoading.show({
      template: 'Loading...'
    });
    factoryCheckin.save(checkin, function(checkin) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Adicionado aos favoritos!'
      });
      console.log("BF create", checkin);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Não foi possivel adicionar aos favoritos!'
      });
    });
  }

})
