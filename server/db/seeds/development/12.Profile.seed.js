'use strict'

const Users = require('./10.User.seed')
const {pascalcase} = require('stringcase')

module.exports = [
  ...Users.map(({id, name}) => ({
    id,
    email: `${name}@example.com`,
    name: `[Test] ${pascalcase(name)}`,
    user: {$$entity: true, $$as: 'User', id},
  }))
]
