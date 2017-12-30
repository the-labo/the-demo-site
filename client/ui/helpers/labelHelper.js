'use strict'


exports.labelTextForUser = function labelTextForUser (user) {
  if (!user) {
    return null
  }
  const {profile} = user
  return (profile && profile.name) ? profile.name : user.name
}