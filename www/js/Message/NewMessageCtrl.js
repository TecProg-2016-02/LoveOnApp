angular.module('starter')

.controller('NewMessageCtrl', function($scope, $location, angularFire) {
  $scope.rooms = [];
  var ref = new Firebase('https://loveonapp.firebaseio.com/opened_rooms');
  var promise = angularFire(ref, $scope, "rooms");

  $scope.newChatName = "";
  $scope.newChatNameId = "";
  $scope.newChatDescription = "";

  $scope.setnewChatNameId = function() {
    this.newChatNameId = this.newChatName.toLowerCase().replace(/\s/g,"-").replace(/[^a-z0-9\-]/g, '');
  };

  $scope.createChat = function() {
    $scope.rooms.push({
      id: Math.floor(Math.random() * 5000001),
      title: $scope.newChatName,
      slug: $scope.newChatNameId,
      description: $scope.newChatDescription
    });

    $location.path('/home');
  };
})
