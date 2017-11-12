/**
 * Resource mapping
 * @namespace ResourceMapping
 */
'use strict'

const r = require('../db/resources')

module.exports = Object.freeze({
  'Alias': r.AliasResource,
  'Profile': r.ProfileResource,
  'Role': r.RoleResource,
  'Sign': r.SignResource,
  'User': r.UserResource,
})