'use strict'

const _seed = require('./_seed')

module.exports = [
  {
    id: 'superadmin',
    name: 'superadmin',
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
  }, 120)
]
