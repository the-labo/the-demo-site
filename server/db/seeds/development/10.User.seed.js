'use strict'

const {SUPER_ADMIN_NAME,} = require('@self/Local')
const _seed = require('./_seed')

module.exports = [
  {
    createdAt: new Date(),
    id: 'superadmin',
    name: SUPER_ADMIN_NAME,
    role: {$$as: 'Role', $$entity: true, id: 1,},
  },
  ...['demo', 'demo2', 'demo3'].map((name, i) => {
    return {
      createdAt: new Date(),
      id: name,
      name,
      role: {$$as: 'Role', $$entity: true, id: 1,},
    }
  }),
  ..._seed.explode({
    createdAt: new Date(),
    id: ({index,}) => String(index),
    name: ({email,}) => email.split('@')[0],
  }, 102).map((v) => ({
    profile: {$$as: 'Profile', $$entity: true, id: v.id,},
    sign: {$$as: 'Sign', $$entity: true, id: v.id,},
    ...v,
  }))
]
