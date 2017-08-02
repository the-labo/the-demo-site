'use strict'

const _seed = require('./_seed')

module.exports = [
  ...['demo', 'demo2', 'demo3'].map((name, i) => {
    return {
      id: String(i + 1),
      name,
      createdAt: new Date(),
      role: {$$entity: true, $$as: 'Role', id: 1}
    }
  }),
  ..._seed.explode({
    id: ({index}) => String(index + 4),
    name: ({email}) => email.split('@')[0],
    createdAt: new Date()
  }, 120)
]
