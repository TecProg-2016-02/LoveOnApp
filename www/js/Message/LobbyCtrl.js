angular.module('starter')

.controller('LobbyCtrl', function($scope, $timeout, $firebaseObject, $location) {
  var ref = new Firebase('https://loveonapp.firebaseio.com/opened_rooms');
  $scope.rooms = $firebaseObject(new Firebase('https://loveonapp.firebaseio.com/opened_rooms'));

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
