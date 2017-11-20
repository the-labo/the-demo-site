'use strict'


exports.labelForUser = function labelForUser (user) {
  if (!user) {
    return null
  }
  const {profile} = user
  return (profile && profile.name) ? profile.name : user.name
}