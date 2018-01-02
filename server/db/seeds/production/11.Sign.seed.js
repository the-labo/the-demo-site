'use strict'

const thePassword = require('the-password')
const {randomBytes} = require('crypto')
const {digest: digestPassword} = thePassword()
const SUPER_ADMIN_PASSWORD = randomBytes(8).toString('hex')

module.exports = [
  {
    id: 'superadmin',
    passwordSalt: 'superadmin-salt',
    passwordHash: digestPassword(SUPER_ADMIN_PASSWORD, 'superadmin-salt'),
    user: {$$entity: true, $$as: 'User', id: '1'}
  }
]
