angular.module('starter')

.controller('RoomCtrl', function($scope, $routeParams, $timeout, angularFire) {
  $scope.newMessage = "";
  $scope.messages = [];

  var ref = new Firebase('https://loveonapp.firebaseio.com/rooms/' + $routeParams.roomId);
  var promise = angularFire(ref, $scope, "messages");

  $scope.username = 'User' + Math.floor(Math.random() * 501);
  $scope.submitAddMessage = function() {
    $scope.messages.push({
      created_by: this.username,
      content: this.newMessage,
      created_at: new Date()
    });
    this.newMessage = "";
  };

  $scope.onRefresh = function() {
    var stop = $timeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
    }, 1000);
  };
})
