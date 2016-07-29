angular.module('starter')

.controller('UsersCtrl', function($ionicPopup ,$scope, $state,
  $rootScope, $ionicLoading, serviceLogin, factoryInteract, factoryUsers) {

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
