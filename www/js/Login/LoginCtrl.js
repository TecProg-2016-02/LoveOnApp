angular.module('starter')

.controller('LoginCtrl', function($ionicPopup ,$scope, $state,
  $rootScope, $ionicLoading, factoryRegister, factoryLogin, serviceLogin,
  serviceLoginSocial, serviceRegisterSocial) {

  var ref = new Firebase("https://appwego.firebaseio.com");
  $scope.loginFacebook = function() {

    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {

        $state.go('app.profile');
        console.log("Data from Firebase:", authData);
        serviceLogin.setUser(
          authData.facebook.displayName,
          authData.facebook.email,
          authData.facebook.id
        );
        serviceRegisterSocial.setUser(
          authData.facebook.displayName,
          authData.facebook.email,
          authData.facebook.id
        );
        console.log("Usr:", serviceRegisterSocial.getUser());
        factoryRegister.save(serviceRegisterSocial.getUser(), function(user) {
          $ionicLoading.hide();
          $scope.loginEmail(serviceRegisterSocial.getUser());
          $state.go('app.home');
        }, function(error) {
          $ionicLoading.hide();
          $state.go('app.home');
        });
        $state.go('app.home');
        $rootScope.user = serviceLogin.getUser();
        console.log("User:", $rootScope.user);
      }
    }, {
      remember: "sessionOnly",
      scope: "email, user_friends, user_birthday, user_photos"
    });
  }


  $scope.minDate = new Date(2105, 6, 1);
  $scope.maxDate = new Date(2015, 6, 31);

  $scope.datePickerCallback = function (val) {
    if (!val) {
      console.log('Date not selected');
    } else {
      console.log('Selected date is : ', val);
    }
  };

  $scope.loginEmail = function(user) {
    $ionicLoading.show({
      template: 'Loading...'
    });
    factoryLogin.get(user, function(user) {
      serviceLogin.setUser(
        user.name,
        user.email,
        user.auth_token,
        user.birthday,
        user.gender,
        user.id
      );
      $ionicLoading.hide();
      $rootScope.user = user;
      console.log(user);
      $state.go('app.profile');
      $ionicLoading.hide();
      $rootScope.logged = true;
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Login Falhou'
      });
    })
  }

  $scope.registerEmail = function(user) {
    $ionicLoading.show({
      template: 'Loading...'
    });
    factoryRegister.save(user, function(user) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Cadastro efetuado com sucesso!'
      });
      $state.go('app.home');
      console.log("BF create", user);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Cadastro falhou, verifique os dados ou se o email ja foi cadastrado'
      });
    });
  }

})
