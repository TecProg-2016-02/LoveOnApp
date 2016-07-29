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
// .factory('factoryConfirmEmail', function($resource) {
//   return $resource("http://localhost:3000/users/confirm_email/", {}, {
//       'get': { method:'GET',
//                   params:{  confirm_token:'@confirm_token' }
//       }
//
//   })
// })
