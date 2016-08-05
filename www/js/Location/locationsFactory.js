angular.module('starter')

.factory('factoryLocations', function($resource) {
  return $resource("http://localhost:3000/locations/", {}, {
      'get': {
              method:'GET',
              isArray:true
            }
    })
})

.factory('factoryCompany', function($resource) {
  return $resource("http://localhost:3000/location/show/", {}, {
      'get': { method:'GET',
                  params:{  name:'@name' }
      }

  })
})

.factory('factoryCheckin', function($resource) {
  return $resource("http://localhost:3000/location/checkin")
})

.factory('factoryCheckins', function($resource) {
  return $resource("http://localhost:3000/location/checkins/", {}, {
      'get': {
                  method:'GET',
                  params:{  auth_token:'@auth_token' },
                  isArray:true
      }

  })
})
