angular.module('starter')

.service('serviceLogin', function() {

  var user = {}

  var setUser = function(name, email, auth_token, birthday, gender, id) {
    user.name = name,
    user.email = email,
    user.auth_token = auth_token,
    user.birthday = birthday,
    user.gender = gender,
    user.id = id
  }

  var getUser = function() {
    return user;
  }

  return {
    setUser: setUser,
    getUser: getUser
  }

})

.service('serviceLoginSocial', function() {

  var user = {}

  var setUser = function(name, email, id_social) {
    user.name = name,
    user.email = email,
    user.id_social = id_social,
    user.password = id_social,
    user.password_confirmation = id_social
  }

  var getUser = function() {
    return user;
  }

  return {
    setUser: setUser,
    getUser: getUser
  }

})

.service('serviceRegisterSocial', function() {

  var user = {}

  var setUser = function(name, email, id_social, gender, birthday, picture) {
    user.name = name,
    user.email = email,
    user.id_social = id_social,
    user.password = id_social,
    user.password_confirmation = id_social
    user.gender = gender,
    user.birthday = birthday,
    user.picture = picture
  }

  var getUser = function() {
    return user;
  }

  return {
    setUser: setUser,
    getUser: getUser
  }

})
