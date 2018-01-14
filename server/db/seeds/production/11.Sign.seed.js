'use strict'

const thePassword = require('the-password').default
const {digest: digestPassword} = thePassword()
const Local = require('@self/Local')

module.exports = [
  {
    id: 'superadmin',
    passwordSalt: 'superadmin-salt',
    passwordHash: digestPassword(Local.SUPER_ADMIN_PASSWORD, 'superadmin-salt'),
    user: {$$entity: true, $$as: 'User', id: 'superadmin'}
  }
]
