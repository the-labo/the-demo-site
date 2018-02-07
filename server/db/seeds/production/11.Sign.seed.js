'use strict'

const Local = require('@self/Local')
const thePassword = require('the-password').default
const {digest: digestPassword} = thePassword()

module.exports = [
  {
    id: 'superadmin',
    passwordHash: digestPassword(Local.SUPER_ADMIN_PASSWORD, 'superadmin-salt'),
    passwordSalt: 'superadmin-salt',
    user: {$$as: 'User', $$entity: true, id: 'superadmin'},
  }
]
