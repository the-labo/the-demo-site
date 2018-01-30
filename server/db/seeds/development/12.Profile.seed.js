'use strict'

const {pascalcase,} = require('stringcase')
const Users = require('./10.User.seed')

module.exports = [
  ...Users.map(({id, name,}) => ({
    email: `${name}@example.com`,
    id,
    name: `[Test] ${pascalcase(name)}`,
    user: {$$as: 'User', $$entity: true, id,},
  }))
]
