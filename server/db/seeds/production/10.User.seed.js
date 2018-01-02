'use strict'

const _seed = require('./_seed')
const {SUPER_ADMIN_NAME} = require('@self/Local')

module.exports = [
  {
    id: 'superadmin',
    name: SUPER_ADMIN_NAME,
    createdAt: new Date(),
    role: {$$entity: true, $$as: 'Role', id: 1}
  }
]
