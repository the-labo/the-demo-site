'use strict'

const Users = require('./10.User.seed')
const {pascalcase} = require('stringcase')

module.exports = [
  ...Users.map(({id, name}) => ({
    email: `${name}@example.com`,
    id,
    name: `[Test] ${pascalcase(name)}`,
    user: {$$as: 'User', $$entity: true, id,},
  }))
]
