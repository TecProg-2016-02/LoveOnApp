angular.module('starter')

.factory('factoryInteract', function($resource) {
  return $resource("http://87503027.ngrok.io/users/interact")
})

.factory('factoryUsers', function($resource) {
  return $resource("http://87503027.ngrok.io/users/all", {}, {
      'get': {
              method:'GET',
              isArray:true
            }
    })
})
// .factory('factoryConfirmEmail', function($resource) {
//   return $resource("http://87503027.ngrok.io/users/confirm_email/", {}, {
//       'get': { method:'GET',
//                   params:{  confirm_token:'@confirm_token' }
//       }
//
//   })
// })
