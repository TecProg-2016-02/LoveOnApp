angular.module('starter')

.controller('LobbyCtrl', function($scope, $timeout, $firebase, $location) {
  var ref = new Firebase('https://loveonapp.firebaseio.com/opened_rooms');
  $scope.rooms = $firebase(ref);

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
