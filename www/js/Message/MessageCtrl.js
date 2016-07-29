angular.module('starter')

.controller('MessageCtrl', function($scope, $rootScope, $stateParams, $timeout, $firebaseObject, $firebaseArray, $location, $ionicScrollDelegate) {
  var roomRef = new Firebase('https://loveonapp.firebaseio.com/opened_rooms/');
  var messagesRef = new Firebase('https://loveonapp.firebaseio.com/rooms/' + $rootScope.roomId);

  $scope.newMessage = "";
  $scope.roomsObj = $firebaseArray(roomRef);
  $scope.messagesObj = $firebaseArray(messagesRef);

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

  $scope.$watch('roomsObj', function (value) {
    var roomsObj = angular.fromJson(angular.toJson(value));
    $scope.room = false;

    angular.forEach(roomsObj, function (room, key) {
      if ($scope.room) return;
      if (room.id == $stateParams.roomId) {
        $scope.room = room;
      };
    });
  }, true);

  $scope.submitAddMessage = function() {
    $scope.messagesObj.$add({
      created_by: this.username,
      content: this.newMessage,
      created_at: new Date()
    });
    this.newMessage = "";

    scrollBottom();
  };
})
