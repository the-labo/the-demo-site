'use strict'

const {SUPER_ADMIN_NAME} = require('@self/Local')
const seed = require('the-seed')('en')

module.exports = [
  {
    id: 'superadmin',
    name: SUPER_ADMIN_NAME,
    role: {$$as: 'Role', $$entity: true, id: 1},
  },
  ...['demo', 'demo2', 'demo3'].map((name, i) => {
    return {
      id: name,
      name,
      role: {$$as: 'Role', $$entity: true, id: 1},
    }
  }),
  ...['e2e', 'e2e2', 'e2e3'].map((name, i) => {
    return {
      id: name,
      name,
      role: {$$as: 'Role', $$entity: true, id: 1},
    }
  }),
  ...seed.explode({
    id: ({index}) => String(index),
    name: ({internet: {email}}) => email().split('@')[0].toLowerCase().replace(/\./g, '_'),
  }, 102).map((v) => ({
    profile: {$$as: 'Profile', $$entity: true, id: v.id},
    sign: {$$as: 'Sign', $$entity: true, id: v.id},
    ...v,
  }))
]
