angular.module('starter')

.service('serviceLogin', function() {

  var user = {}

  var setUser = function(name, email, token, birthday, gender, id, email_confirmed, avatar, search_female, search_male) {
    user.name = name,
    user.email = email,
    user.token = token,
    user.birthday = birthday,
    user.gender = gender,
    user.id = id,
    user.email_confirmed = email_confirmed,
    user.avatar = avatar,
    user.search_male = search_male,
    user.search_female = search_female
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

  var setUser = function(name, email, id_facebook) {
    user.name = name,
    user.email = email,
    user.id_facebook = id_facebook,
    user.password = id_facebook,
    user.password_confirmation = id_facebook
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

  var setUser = function(name, email, id_facebook, gender, birthday, avatar, search_female, search_male) {
    user.name = name,
    user.email = email,
    user.id_facebook = id_facebook,
    user.password = id_facebook,
    user.password_confirmation = id_facebook
    user.gender = gender,
    user.birthday = birthday,
    user.avatar = avatar,
    user.search_female = search_female,
    user.search_male = search_male
  }

  var getUser = function() {
    return user;
  }

  return {
    setUser: setUser,
    getUser: getUser
  }

})
