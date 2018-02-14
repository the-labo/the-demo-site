'use strict'

const {pascalcase} = require('stringcase')
const Users = require('./10.User.seed')
const seed = require('the-seed')('en')

module.exports = [
  ...Users.map(({id, name}) => seed.apply({
    email: `${name}@example.com`,
    id,
    image: '#{image.avatar()}',
    name: `[Test] ${pascalcase(name)}`,
    user: {$$as: 'User', $$entity: true, id},
  }))
]
