angular.module('starter')

.controller('NewMessageCtrl', function($scope, $timeout, $firebaseArray, $firebaseObject, $location) {
  var ref = new Firebase('https://loveonapp.firebaseio.com/opened_rooms');
  console.log(ref);
  $scope.rooms = $firebaseArray(ref);

  $scope.createRoom = function(roomName, roomDescription) {
    if (!roomName) return;

    var roomId = Math.floor(Math.random() * 5000001);

    $scope.rooms.$add({
      id: roomId,
      title: roomName,
      slug: roomName.split(/\s+/g).join('-'),
      description: roomDescription
    });

    $location.path('/rooms/' + roomId);
  };
  console.log($scope.rooms);
  $scope.rightButtons = [
    {
      type: 'button-energized',
      content: '<i class="icon ion-plus"></i>',
      tap: function(e) {
        $location.path("/new");
      }
    }
  ];
})
