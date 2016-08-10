angular.module('starter')

.factory('factoryLocations', function($resource,URL) {
  return $resource(URL+"/locations/", {}, {
      'get': {
              method:'GET',
              isArray:true
            }
    })
})

.factory('factoryLocation', function($resource,URL) {
  return $resource(URL+"/locations/show/")
})

.factory('factoryCheckin', function($resource,URL) {
  return $resource(URL+"/locations/checkin")
})

.factory('factoryCheckins', function($resource,URL) {
  return $resource(URL+"/locations/user/checkins/", {}, {
      'get': {
                  method:'GET',
                  params:{  auth_token:'@auth_token' },
                  isArray:true
      }

  })
})
