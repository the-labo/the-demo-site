'use strict'

const thePassword = require('the-password').default
const Users = require('./10.User.seed')
const {digest: digestPassword, generateSalt,} = thePassword()

module.exports = [
  ...Users.map(({id, name,}) => {
    const salt = generateSalt()
    return {
      id,
      passwordHash: digestPassword(name, salt),
      passwordSalt: salt,
      user: {$$as: 'User', $$entity: true, id,},
    }
  })
]
