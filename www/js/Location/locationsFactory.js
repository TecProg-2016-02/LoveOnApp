angular.module('starter')

.factory('factoryLocations', function($resource) {
  return $resource("http://007cac0b.ngrok.io/locations/", {}, {
      'get': {
              method:'GET',
              isArray:true
            }
    })
})

.factory('factoryLocation', function($resource) {
  return $resource("http://007cac0b.ngrok.io/locations/show/", {}, {
      'get': { method:'GET',
                  params:{  name:'@name' }
      }

  })
})

.factory('factoryCheckin', function($resource) {
  return $resource("http://007cac0b.ngrok.io/locations/checkin")
})

.factory('factoryCheckins', function($resource) {
  return $resource("http://007cac0b.ngrok.io/locations/user/checkins/", {}, {
      'get': {
                  method:'GET',
                  params:{  auth_token:'@auth_token' },
                  isArray:true
      }

  })
})
