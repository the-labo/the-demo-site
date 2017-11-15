/**
 * Store scopes
 * @module scopes
 */
'use strict'

const account = require('./account')
const app = require('./app')
const password = require('./password')
const profile = require('./profile')
const quit = require('./quit')
const recover = require('./recover')
const sign = require('./sign')
const toast = require('./toast')
const user = require('./user')
const verify = require('./verify')

module.exports = {
  account,
  app,
  password,
  profile,
  quit,
  recover,
  sign,
  toast,
  user,
  verify
}
