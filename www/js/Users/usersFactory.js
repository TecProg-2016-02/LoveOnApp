angular.module('starter')

.factory('factoryInteract', function($resource,URL) {
  return $resource(URL+"/users/interact")
})

.factory('factoryUsers', function($resource,URL) {
  return $resource(URL+"/users/all", {}, {
      'get': {
              method:'GET',
              isArray:true
            }
    })
})
.factory('factoryUser', function($resource,URL) {
  return $resource(URL+"/users/show", {}, {
      'get': {
              method:'GET',
              params:{
                token:'@token',
                current_user_token:'@current_user_token'
              }
            }
    })
})

.factory('factoryFollow', function($resource,URL) {
  return $resource(URL+'/users/follow')
})
.factory('factoryUnfollow', function($resource,URL) {
  return $resource(URL+'/users/unfollow')
})
.factory('factoryBlock', function($resource,URL) {
  return $resource(URL+"/users/block")
})
.factory('factoryUnblock', function($resource,URL) {
  return $resource(URL+"/users/unblock")
})
.factory('factoryReport', function($resource,URL) {
  return $resource(URL+"/users/report")
})
// .factory('factoryConfirmEmail', function($resource,URL) {
//   return $resource(URL+users/confirm_email/", {}, {
//       'get': { method:'GET',
//                   params:{  confirm_token:'@confirm_token' }
//       }
//
//   })
// })
