'use strict'

const Users = require('./10.User.seed')

module.exports = [
  ...Users.map(({id, name}) => ({
    id,
    email: `${name}@example.com`,
    user: {$$entity: true, $$as: 'User', id}
  }))
]
