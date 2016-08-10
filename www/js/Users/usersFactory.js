angular.module('starter')

.factory('factoryInteract', function($resource) {
  return $resource("http://007cac0b.ngrok.io/users/interact")
})

.factory('factoryUsers', function($resource) {
  return $resource("http://007cac0b.ngrok.io/users/all", {}, {
      'get': {
              method:'GET',
              isArray:true
            }
    })
})
.factory('factoryUser', function($resource) {
  return $resource("http://007cac0b.ngrok.io/users/show")
})

.factory('factoryFollow', function($resource) {
  return $resource("http://007cac0b.ngrok.io/users/follow")
})

// .factory('factoryConfirmEmail', function($resource) {
//   return $resource("http://007cac0b.ngrok.io/users/confirm_email/", {}, {
//       'get': { method:'GET',
//                   params:{  confirm_token:'@confirm_token' }
//       }
//
//   })
// })
