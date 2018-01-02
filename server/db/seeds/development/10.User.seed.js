'use strict'

const _seed = require('./_seed')
const {SUPER_ADMIN_NAME} = require('@self/Local')

module.exports = [
  {
    id: 'superadmin',
    name: SUPER_ADMIN_NAME,
    createdAt: new Date(),
    role: {$$entity: true, $$as: 'Role', id: 1}
  },
  ...['demo', 'demo2', 'demo3'].map((name, i) => {
    return {
      id: name,
      name,
      createdAt: new Date(),
      role: {$$entity: true, $$as: 'Role', id: 1}
    }
  }),
  ..._seed.explode({
    id: ({index}) => String(index),
    name: ({email}) => email.split('@')[0],
    createdAt: new Date()
  }, 102)
]
