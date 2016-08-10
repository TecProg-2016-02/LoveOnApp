angular.module('starter')

.factory('factoryInteract', function($resource) {
  return $resource("http://localhost:3000/users/interact")
})

.factory('factoryUsers', function($resource) {
  return $resource("http://localhost:3000/users/all", {}, {
      'get': {
              method:'GET',
              isArray:true
            }
    })
})
.factory('factoryUser', function($resource) {
  return $resource("http://localhost:3000/users/show")
})

.factory('factoryFollow', function($resource) {
  return $resource("http://localhost:3000/users/follow")
})

// .factory('factoryConfirmEmail', function($resource) {
//   return $resource("http://localhost:3000/users/confirm_email/", {}, {
//       'get': { method:'GET',
//                   params:{  confirm_token:'@confirm_token' }
//       }
//
//   })
// })
