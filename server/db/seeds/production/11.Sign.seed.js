'use strict'

const Users = require('./10.User.seed')

const thePassword = require('the-password')
const {generateSalt, digest: digestPassword} = thePassword()
const {SUPER_ADMIN_PASSWORD} = require('@self/Local')

module.exports = [
  {
    id: 'superadmin',
    passwordSalt: 'superadmin-salt',
    passwordHash: digestPassword(SUPER_ADMIN_PASSWORD, 'superadmin-salt'),
    user: {$$entity: true, $$as: 'User', id: '1'}
  }
]
