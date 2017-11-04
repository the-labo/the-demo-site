'use strict'

const _seed = require('./_seed')

module.exports = [
  {
    id: 'superadmin',
    name: 'superadmin',
    createdAt: new Date(),
    role: {$$entity: true, $$as: 'Role', id: 1}
  }
]
