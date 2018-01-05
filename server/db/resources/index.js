/**
 * Db resource classes
 * @module resources
 */
'use strict'

const AliasResource = require('./AliasResource')
const ProfileResource = require('./ProfileResource')
const RoleResource = require('./RoleResource')
const SignResource = require('./SignResource')
const UserResource = require('./UserResource')

module.exports = {
  AliasResource,
  ProfileResource,
  RoleResource,
  SignResource,
  UserResource
}

exports.AliasResource = AliasResource
exports.ProfileResource = ProfileResource
exports.RoleResource = RoleResource
exports.SignResource = SignResource
exports.UserResource = UserResource
