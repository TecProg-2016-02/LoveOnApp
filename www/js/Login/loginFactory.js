
angular.module('starter')

.factory('factoryRegister', function($resource,URL) {
  return $resource(URL+"/users/create")
})

.factory('factoryLogin', function($resource,URL) {
  return $resource(URL+"/users/login/:email")
})
.factory('factoryLogout', function($resource,URL) {
  return $resource(URL+"/users/logout")
})
.factory('factoryConfirmEmail', function($resource,URL) {
  return $resource(URL+"/users/confirm_email/", {}, {
      'get': { method:'GET',
                  params:{  confirm_token:'@confirm_token' }
      }

  })
})

.factory("factoryUpdate", function($resource,URL) {
  return $resource(URL+"/users/update", {}, {
      'update': { method:'POST',
                  params:{  token:'@token' }
      }
    })
})
