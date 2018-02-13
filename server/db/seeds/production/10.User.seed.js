'use strict'

const {SUPER_ADMIN_NAME} = require('@self/Local')

module.exports = [
  {
    createdAt: new Date(),
    id: 'superadmin',
    name: SUPER_ADMIN_NAME,
    role: {$$as: 'Role', $$entity: true, id: 1},
  }
]
