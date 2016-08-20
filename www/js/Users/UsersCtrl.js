angular.module('starter')

.controller('UsersCtrl', function($ionicPopup ,$scope, $state, $firebaseArray,
  $rootScope, $ionicLoading, serviceLogin, factoryInteract, factoryUsers,
  $timeout, factoryUser, factoryFollow, $ionicScrollDelegate, $ionicPopover) {

  var ref = new Firebase('https://loveonapp.firebaseio.com/opened_rooms');
  // var roomRef = new Firebase('https://loveonapp.firebaseio.com/opened_rooms/');

  $scope.rooms = $firebaseArray(ref);

  $scope.createRoom = function(roomId) {
    if (!roomId) return;

    // $rootScope.roomId = roomId;
    $scope.rooms.$add({
      id: roomId,
      slug: roomId.split(/\s+/g).join('-')
    });

    // $location.path('/rooms/' + roomId);
    console.log($scope.rooms);
  };

  $scope.newMessage = "";
  // $scope.roomsObj = $firebaseArray(roomRef);


  $scope.leftButtons = [
    {
      type: 'button-energized',
      content: '<i class="icon ion-arrow-left-c"></i>',
      tap: function(e) {
        $location.path('/');
      }
    }
  ]

  var scrollBottom = function() {
    // Resize and then scroll to the bottom
    $ionicScrollDelegate.resize();
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom();
    });
  };

  $scope.chatRoom = function(roomId) {
    $rootScope.roomId = roomId;
  }
  console.log("sala",$rootScope.roomId);
  var messagesRef = new Firebase('https://loveonapp.firebaseio.com/rooms/' + $rootScope.roomId);
  var ref = messagesRef;
  $rootScope.messagesObj = $firebaseArray(messagesRef);
  console.log($rootScope.messagesObj);

  var now = Date.now();
  var cutoff = now - 7 * 24 * 60 * 60 * 1000;
  var old = ref.orderByChild('created_at').endAt(cutoff).limitToLast(1);
  var listener = old.on('child_added', function(shot) {
      shot.ref().remove();
  });

  $scope.$watch('messagesObj', function (value) {
    var messagesObj = angular.fromJson(angular.toJson(value));
    $timeout(function () {scrollBottom()});
    $scope.messages = [];

    angular.forEach(messagesObj, function (message, key) {
      $scope.messages.push(message);
    });

    if ($scope.messages.length) {
      loaded = true;
    }
  }, true);

  $scope.submitAddMessage = function() {
    $rootScope.messagesObj.$add({
      created_by: this.username,
      content: this.newMessage,
      created_at: Date.now(),
      email: this.user.email
    });
    this.newMessage = "";

    scrollBottom();
  };

  $scope.addInteraction = function(user) {
    var interaction = {};

    interaction.user_one_id = serviceLogin.getUser().id;
    interaction.user_two_id = user.id;
    interaction.like = true;
    console.log("interação",interaction);
    $ionicLoading.show({
      template: 'Carregando... <ion-spinner icon="android"></ion-spinner>'
    });
    factoryInteract.save(interaction, function(interaction) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: '',
        template: 'Like!'
      });
      console.log("Before create", interaction);
      if(interaction.matched){
        $ionicPopup.alert({
          title: 'Match!',
          template: 'É um match!'
        });
        $scope.createRoom(interaction.match.token);
      }
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Não é possivel dar like duas vezes!'
      });
    });
  }

  $scope.allUsers = function() {
    factoryUsers.get(function(users) {
      $ionicLoading.hide();
      $rootScope.users = users;
      console.log($rootScope.users);
      $ionicLoading.hide();
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Falhou'
      });
    })
  }

  $scope.viewUser = function(token) {
    $ionicLoading.show({
      template: 'Carregando... <ion-spinner icon="android"></ion-spinner>'
    });
    factoryUser.get({
      token: token
    }, function(userp) {
      $ionicLoading.hide();
      $rootScope.userp = userp;
      $rootScope.usergallery=[];
      for (var i = 0; i < userp.gallery.length; i++) {
        $rootScope.usergallery.push({
          src: userp.gallery[i],
          sub: ''
        });
      }
      console.log($rootScope.userp);
      $state.go('app.user');
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Falhou'
      });
    })
  };

  $scope.imglocation = {
    img: 'img/local_map.png'
  };

  $scope.imgheart = {
    img: 'img/unnamed.png'
  };

  $ionicPopover.fromTemplateUrl('templates/popoverUser.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  $scope.follow = function(user) {
    $ionicLoading.show({
      template: 'Carregando... <ion-spinner icon="android"></ion-spinner>'
    });
    user.main_user_auth_token = serviceLogin.getUser().token;
    factoryFollow.save(user, function(user) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Voce esta seguindo {{userp.name}}!'
      });
      console.log("BF create", user);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Você já está seguindo {{userp.name}}'
      });
    });
  };

})
