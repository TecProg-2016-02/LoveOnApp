
angular.module('starter')

.factory('factoryRegister', function($resource) {
  return $resource("http://007cac0b.ngrok.io/users/create")
})

.factory('factoryLogin', function($resource) {
  return $resource("http://007cac0b.ngrok.io/users/login/:email")
})
.factory('factoryLogout', function($resource) {
  return $resource("http://007cac0b.ngrok.io/users/logout")
})
.factory('factoryConfirmEmail', function($resource) {
  return $resource("http://007cac0b.ngrok.io/users/confirm_email/", {}, {
      'get': { method:'GET',
                  params:{  confirm_token:'@confirm_token' }
      }

  })
})

.factory("factoryUpdate",function($resource){
  return $resource("http://007cac0b.ngrok.io/users/update", {}, {
      'update': { method:'PATCH',
                  params:{  token:'@token' }
      }
    })
})
