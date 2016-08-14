angular.module('starter')

.controller('locationsCtrl', function($ionicPopup ,$scope, $state, $stateParams,
  $rootScope, $ionicLoading, serviceLogin, factoryLocations, factoryCheckins,
  factoryLocation, factoryCheckin) {

  $scope.allLocations = function() {
    $ionicLoading.show({
      template: 'Carregando... <ion-spinner icon="android"></ion-spinner>'
    });
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
        template: 'Falha de comunicação com o banco'
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
        template: 'Falha de comunicação com o banco'
      });
    })
  };

  $scope.viewLocation = function(params) {
    $ionicLoading.show({
      template: 'Carregando... <ion-spinner icon="android"></ion-spinner>'
    });
    params.user_token = $rootScope.user.token;
    factoryLocation.save(params, function(location) {
      $ionicLoading.hide();
      console.log(location);
      $rootScope.loc = location;
      console.log("local", location);
      $state.go('app.location');
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Erro ao carregar localização!'
      });
    })

  };

  $scope.doCheckin = function(location) {
    var checkin = {};
    checkin.user_token = serviceLogin.getUser().token;
    checkin.location_token = location.token;
    $ionicLoading.show({
      template: 'Carregando... <ion-spinner icon="android"></ion-spinner>'
    });
    factoryCheckin.save(checkin, function(checkin) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Você fez checkin neste local,\n'+
          'só poderá fazer checkin novamente dentro de 30 minutos!'
      });
      $scope.viewLocation(location);
      console.log("BF create", checkin);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Não é possível trocar de localização,\n'+
          ' aguarde 30 minutos!'
      });
      $state.go('app.locations');
    });
  }

})
