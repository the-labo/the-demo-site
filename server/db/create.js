/**
 * Create an db instance
 * @function create
 * @returns {TheDB}
 */
'use strict'

const theDB = require('the-db')
const env = require('../env')
const {
  AliasResource,
  ProfileResource,
  RoleResource,
  SignResource,
  UserResource
} = require('./resources')

/** @lends create */
function create (config = env.database) {
  const db = theDB(config)
  db.load(AliasResource, 'Alias')
  db.load(ProfileResource, 'Profile')
  db.load(RoleResource, 'Role')
  db.load(SignResource, 'Sign')
  db.load(UserResource, 'User')

  return db
}

module.exports = create
