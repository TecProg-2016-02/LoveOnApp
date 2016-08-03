
angular.module('starter')

.factory('factoryRegister', function($resource) {
  return $resource("http://localhost:3000/users/create")
})

.factory('factoryLogin', function($resource) {
  return $resource("http://localhost:3000/users/login/:email")
})

.factory('factoryConfirmEmail', function($resource) {
  return $resource("http://localhost:3000/users/confirm_email/", {}, {
      'get': { method:'GET',
                  params:{  confirm_token:'@confirm_token' }
      }

  })
})

.factory("factoryUpdate",function($resource,URL){
  return $resource("http://localhost:3000/users/update", {}, {
      'update': { method:'PATCH',
                  params:{  email:'@email' }
      }
    })
})
