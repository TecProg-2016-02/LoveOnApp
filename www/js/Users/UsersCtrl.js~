angular.module('starter')

.controller('UsersCtrl', function($ionicPopup ,$scope, $state, $firebaseArray,
  $rootScope, $ionicLoading, serviceLogin, factoryInteract, factoryUsers,
  $timeout, factoryUser, factoryFollow, $ionicScrollDelegate, $ionicPopover,
  factoryUnfollow, $ionicModal, factoryBlock, factoryUnblock, factoryReport) {

  var firebase = new Firebase('https://loveonapp.firebaseio.com/opened_rooms');
  // var roomRef = new Firebase('https://loveonapp.firebaseio.com/opened_rooms/');

  $scope.rooms = $firebaseArray(firebase);

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

  $rootScope.roomId = "";
  $scope.chatRoom = function(roomId) {
    $rootScope.roomId = roomId;
  }
  console.log("sala",$rootScope.roomId);
  var firebaseRoom = new Firebase('https://loveonapp.firebaseio.com/rooms/' + $rootScope.roomId);
  var room = firebaseRoom;
  $rootScope.messagesObj = $firebaseArray(firebaseRoom);
  console.log($rootScope.messagesObj);

  var now = Date.now();
  var cutoff = now - 7 * 24 * 60 * 60 * 1000;
  var old = room.orderByChild('created_at').endAt(cutoff).limitToLast(1);
  var listener = old.on('child_added', function(shot) {
      shot.room().remove();
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

  $scope.openModal = function() {
    $ionicModal.fromTemplateUrl('templates/modalMatch.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $rootScope.otherUser = {};
  $scope.addInteraction = function(user) {
    var interaction = {};
    $rootScope.otherUser = user;
    interaction.user_one_id = serviceLogin.getUser().id;
    interaction.user_two_id = user.id;
    interaction.like = true;
    console.log("interação",interaction);
    $ionicLoading.show({
      template: 'Carregando... <ion-spinner icon="android"></ion-spinner>'
    });
    factoryInteract.save(interaction, function(interaction) {
      $ionicLoading.hide();
      console.log("Before create", interaction);

      if(interaction.matched){
        $scope.openModal();

        $scope.createRoom(interaction.match.token);
        console.log($rootScope.user);
      }
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Não é possivel dar like duas vezes!'
      });
    });
  }

  $rootScope.isBlocked = false;

  $scope.blockUser = function(user) {
    var block = {};
    block.user_one_id = 0;
    block.user_two_id = 0;

    block.user_one_id = serviceLogin.getUser().id;
    block.user_two_id = user.id;
    console.log("interação",block);
    $ionicLoading.show({
      template: 'Bloqueando usuário... <ion-spinner icon="android"></ion-spinner>'
    });
    factoryBlock.save(block, function(block) {
      $ionicLoading.hide();
      console.log(block);
      $ionicPopup.alert({
        title: '',
        template: 'Essa pessoa foi bloqueada!'
      });
      $rootScope.isBlocked = true;
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'você já bloqueou essa pessoa!'
      });
    });
  }

  $scope.reportUser = function(user, comment) {
    var report = {};
    report.reporter_id = 0;
    report.reported_id = 0;
    report.comment = "";

    report.reporter_id = serviceLogin.getUser().id;
    report.reported_id = user.id;
    report.comment = comment;

    $ionicLoading.show({
      template: 'Denunciando usuário... <ion-spinner icon="android"></ion-spinner>'
    });
    factoryReport.save(report, function(report) {
      $ionicLoading.hide();
      console.log(report);
      $ionicPopup.alert({
        title: '',
        template: 'Sua denuncia foi efetuada!'
      });
      $state.go('app.profile');
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'você já denunciou essa pessoa!'
      });
    });
  }

  $scope.unblockUser = function(user,index) {
    var block = {};
    block.user_one_id = 0;
    block.user_two_id = 0;

    block.user_one_id = serviceLogin.getUser().id;
    block.user_two_id = user.id;
    block.like = true;
    console.log("interação",block);
    $ionicLoading.show({
      template: 'Carregando... <ion-spinner icon="android"></ion-spinner>'
    });
    factoryUnblock.save(block, function(block) {
      $rootScope.user.blocks.splice(index, 1);
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: '',
        template: 'Essa pessoa foi desbloqueada!'
      });
      console.log(block);
      $rootScope.isBlocked = false;
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Não foi possível realizar essa operação!'
      });
    });
  }

  $rootScope.users = {};
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

  $rootScope.isFollowing = false;
  $rootScope.isMatched = false;
  $scope.viewUser = function(token) {
    $ionicLoading.show({
      template: 'Carregando perfil... <ion-spinner icon="android"></ion-spinner>'
    });
    factoryUser.get({
      token: token,
      current_user_token: $rootScope.user.token
    }, function(otherUser) {
      console.log("Usuario", otherUser);
      $ionicLoading.hide();
      $rootScope.otherUser = otherUser.user;
      $rootScope.otherUser.locations = otherUser.locations;
      $rootScope.isFollowing = otherUser.is_following;
      $rootScope.isMatched = otherUser.matched;
      $rootScope.isBlocked = otherUser.blocked;
      if (otherUser.gallery) {
        $rootScope.usergallery=[];
        for (var i = 0; i < otherUser.user.gallery.length; i++) {
          $rootScope.usergallery.push({
            src: otherUser.user.gallery[i],
            sub: ''
          });
        }
      }
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
    user.main_user_auth_token = "";
    user.main_user_auth_token = serviceLogin.getUser().token;
    factoryFollow.save(user, function(user) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Voce esta seguindo {{otherUser.name}}!'
      });
      $rootScope.isFollowing = true;
      console.log("BF create", user);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Você já está seguindo {{otherUser.name}}!'
      });
    });
  };

  $scope.unfollow = function(user) {
    $ionicLoading.show({
      template: 'Carregando... <ion-spinner icon="android"></ion-spinner>'
    });
    user.main_user_auth_token = "";
    user.main_user_auth_token = serviceLogin.getUser().token;
    factoryUnfollow.save(user, function(user) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Sucesso!',
        template: 'Voce deixou de seguir {{otherUser.name}}!'
      });
      $rootScope.isFollowing = false;
      console.log("BF create", user);
    }, function(error) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Erro!',
        template: 'Erro ao processar operação.'
      });
    });
  };

})
