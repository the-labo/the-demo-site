'use strict'


exports.displayNameForUser = function displayNameForUser (user) {
  if (!user) {
    return null
  }
  const {profile} = user
  return (profile && profile.name) ? profile.name : user.name
}