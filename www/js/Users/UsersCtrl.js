angular.module('starter')

.controller('UsersCtrl', function($ionicPopup ,$scope, $state, $firebaseArray,
  $rootScope, $ionicLoading, serviceLogin, factoryInteract, factoryUsers, $timeout) {

  var ref = new Firebase('https://loveonapp.firebaseio.com/opened_rooms');
  // var roomRef = new Firebase('https://loveonapp.firebaseio.com/opened_rooms/');

  $scope.rooms = $firebaseArray(ref);

  $scope.createRoom = function(roomId) {
    if (!roomId) return;

    $rootScope.roomId = roomId;
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
    var messagesRef = new Firebase('https://loveonapp.firebaseio.com/rooms/' + roomId);
    $scope.messagesObj = $firebaseArray(messagesRef);
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
  }

  $scope.submitAddMessage = function() {
    $scope.messagesObj.$add({
      created_by: this.username,
      content: this.newMessage,
      created_at: new Date()
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
      template: 'Loading...'
    });
    factoryInteract.save(interaction, function(interaction) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Adicionado aos favoritos!'
      });
      console.log("Before create", interaction);
      if(interaction.matched){
        $scope.createRoom(interaction.match.token);
      }
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Não foi possivel adicionar aos favoritos!'
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

})
