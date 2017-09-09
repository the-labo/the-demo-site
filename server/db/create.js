/**
 * Create an db instance
 * @function create
 * @returns {TheDB}
 */
'use strict'

const theDB = require('the-db')
const env = require('../env')
const r = require('./resources')

/** @lends create */
function create (config = env.database) {
  const db = theDB(config)
  db.load(r.AliasResource, 'Alias')
  db.load(r.ProfileResource, 'Profile')
  db.load(r.RoleResource, 'Role')
  db.load(r.SignResource, 'Sign')
  db.load(r.UserResource, 'User')

  return db
}

module.exports = create
