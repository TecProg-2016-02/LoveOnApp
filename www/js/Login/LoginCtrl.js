angular.module('starter')

.controller('LoginCtrl', function($ionicPopup ,$scope, $state, factoryLogout,
  $rootScope, $ionicLoading, factoryRegister, factoryLogin, serviceLogin,
  serviceLoginSocial, serviceRegisterSocial, factoryConfirmEmail, $timeout,
  factoryUpdate, $cordovaCamera, $cordovaImagePicker) {

  var toDataURL = function(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
      return dataURL
    };
    img.src = src;
  }
  var ref = new Firebase("https://appwego.firebaseio.com");
  $scope.loginFacebook = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          toDataURL(authData.facebook.profileImageURL, function(base64Img) {
            $scope.fbimage = (base64Img.slice(22, base64Img.length));
            console.log($scope.fbimage);
            $scope.$apply();
          });
          $timeout(function () {
            $state.go('app.profile');
            console.log("Data from Firebase:", authData);

            serviceLogin.setUser(
              authData.facebook.displayName,
              authData.facebook.email,
              authData.facebook.id,
              authData.facebook.cachedUserProfile.birthday,
              authData.facebook.cachedUserProfile.gender,
              $scope.fbimage
            );
            serviceRegisterSocial.setUser(
              authData.facebook.displayName,
              authData.facebook.email,
              authData.facebook.id,
              authData.facebook.cachedUserProfile.gender,
              new Date(authData.facebook.cachedUserProfile.birthday),
              $scope.fbimage
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
          }, 4000);
        }
      }, {
        remember: "sessionOnly",
        scope: "email, user_friends, user_birthday, user_photos"
      });
    }

    $scope.selImages = function() {
       var options = {
         maximumImagesCount: 10,
         width: 800,
         height: 800,
         quality: 80
       };

       $cordovaImagePicker.getPictures(options)
         .then(function (results) {
             for (var i = 0; i < results.length; i++) {
                //  console.log('Image URI: ' + results[i]);
                 $scope.imagens.push(results[i]);
                // Encode URI to Base64
                window.plugins.Base64.encodeFile(results[i], function(base64){
                   // Save images in Base64
                   $scope.images.push(base64);
                   $scope.imag = $scope.images[0];
                });

             }
             $scope.$apply();

         }, function(error) {
             // error getting photos
         });
         $scope.$apply();
         console.log("Base64:\n\n\n",$scope.images);

     };


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
        user.email_confirmed,
        user.avatar
      );
      $ionicLoading.hide();
      $rootScope.user = user;
      $rootScope.matches = user.matches;
      for (var i = 0; i < user.matches.length; i++) {
        $rootScope.matches[i].roomId=user.matches_token[i].token;
      }
      $rootScope.username = user.name;
      console.log("Logado", $rootScope.user);
      console.log(user.email_confirmed);
      if(!user.email_confirmed) {
        // $state.go('app.activateaccount');
        $state.go('app.profile');
      } else {
        $state.go('app.profile');
      }
      $ionicLoading.hide();
      $rootScope.isLogged = true;
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Login Falhou'
      });
    })
  }

  $scope.logout = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
    factoryLogout.get(serviceLogin.getUser(), function(user) {
      serviceLogin.setUser(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      );
      $ionicLoading.hide();
      console.log("logout",user);
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
    user.avatar = $rootScope.user.avatar;
    user.gallery = $scope.images;
    factoryUpdate.update({
      token: serviceLogin.getUser().token
    }, {
      user: user
    }, function(user) {

      console.log(user);
    }, function(error) {
      alert("erro", error.message);
    });
  }
  $scope.images = [];
  $scope.imagens = [];
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
        $rootScope.user.avatar = imageUri;
        console.log("image",$rootScope.user.avatar);

      }, 1000)


    }, function cameraError(error) {
      console.debug("Unable to obtain picture: " + error, "app");

    }, options);


  }


});
