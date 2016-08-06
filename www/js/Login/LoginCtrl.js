angular.module('starter')

.controller('LoginCtrl', function($ionicPopup ,$scope, $state,
  $rootScope, $ionicLoading, factoryRegister, factoryLogin, serviceLogin,
  serviceLoginSocial, serviceRegisterSocial, factoryConfirmEmail, $timeout) {

  var ref = new Firebase("https://appwego.firebaseio.com");
  $scope.loginFacebook = function() {

      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          // $scope.url = "https://graph.facebook.com/"+ authData.facebook.id +"/picture?width=700&height=700";
          // $scope.getImageDataURL($scope.url, $scope.onSuccess, $scope.onError);

          $state.go('app.profile');
          console.log("Data from Firebase:", authData);
          serviceLogin.setUser(
            authData.facebook.displayName,
            authData.facebook.email,
            authData.facebook.id,
            authData.facebook.cachedUserProfile.birthday,
            authData.facebook.cachedUserProfile.gender
          );
          serviceRegisterSocial.setUser(
            authData.facebook.displayName,
            authData.facebook.email,
            authData.facebook.id,
            authData.facebook.cachedUserProfile.gender,
            new Date(authData.facebook.cachedUserProfile.birthday)
          );
          console.log("Usr:", serviceRegisterSocial.getUser());
          factoryRegister.save(serviceRegisterSocial.getUser(), function(user) {
            $ionicLoading.hide();
            $scope.loginEmail(serviceRegisterSocial.getUser());
            $state.go('app.home');
          }, function(error) {
            $ionicLoading.hide();
            $ionicPopup.alert({
              title: 'Ops!',
              template: 'Erro ao se comunicar com o servidor!'
            });
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
        user.token,
        user.birthday,
        user.gender,
        user.id,
        user.email_confirmed
      );
      $ionicLoading.hide();
      $rootScope.user = user;
      $rootScope.username = user.name;
      console.log("Logado", user);
      console.log(user.email_confirmed);
      if(!user.email_confirmed) {
        // $state.go('app.activateaccount');
        $state.go('app.profile');
      } else {
        $state.go('app.profile');
      }
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

  $scope.confirmEmail = function(confirm_token) {
    $ionicLoading.show({
      template: 'Loading...'
    });
    factoryConfirmEmail.get({
      confirm_token: confirm_token
    }, function(user) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Cadastro efetuado com sucesso!'
      });
      $state.go('app.primeiraTelaEdit');
      console.log("BF create", user);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Cadastro falhou, verifique os dados ou se o email ja foi cadastrado'
      });
    });
  }

  $scope.updateProfile = function(user) {
    factoryUpdate.update({
      email: serviceLogin.getUser().email
    }, {
      user: user
    }, function(user) {

      console.log(user);
    }, function(error) {
      alert("erro", error.message);
    });
  }

  $scope.alterarFoto = function() {

    function setOptions(srcType) {
      var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true //Corrects Android orientation quirks
      }
      return options;
    }

    function createNewFileEntry(imgUri) {
      window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {

        // JPEG file
        dirEntry.getFile("tempFile.jpeg", {
          create: true,
          exclusive: false
        }, function(fileEntry) {

          // Do something with it, like write to it, upload it, etc.
          // writeFile(fileEntry, imgUri);
          console.log("got file: " + fileEntry.fullPath);
          // displayFileData(fileEntry.fullPath, "File copied to");

        }, onErrorCreateFile);

      }, onErrorResolveUrl);
    }


    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
    var func = createNewFileEntry;

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
      $ionicLoading.show({
        template: 'Recebendo suas informações... <ion-spinner icon="android"></ion-spinner>'
      });


      $timeout(function() {


        $ionicLoading.hide();
        $scope.$apply();
        $scope.image = imageUri;
        console.log("image",$scope.image);

      }, 1000)


    }, function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");

    }, options);


  }


})
