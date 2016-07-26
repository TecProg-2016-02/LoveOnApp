angular.module('starter')

.controller('NewMessageCtrl', function($scope, $location, angularFire) {
  $scope.rooms = [];
  var ref = new Firebase('https://loveonapp.firebaseio.com/opened_rooms');
  var promise = angularFire(ref, $scope, "rooms");

  $scope.newRoomName = "";
  $scope.newRoomNameId = "";
  $scope.newRoomDescription = "";

  $scope.setNewRoomNameId = function() {
    this.newRoomNameId = this.newRoomName.toLowerCase().replace(/\s/g,"-").replace(/[^a-z0-9\-]/g, '');
  };

  $scope.createRoom = function() {
    $scope.rooms.push({
      id: Math.floor(Math.random() * 5000001),
      title: $scope.newRoomName,
      slug: $scope.newRoomNameId,
      description: $scope.newRoomDescription
    });

    $location.path('/home');
  };
})
