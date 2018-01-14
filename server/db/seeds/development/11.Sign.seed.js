'use strict'

const Users = require('./10.User.seed')

const thePassword = require('the-password').default
const {generateSalt, digest: digestPassword} = thePassword()

module.exports = [
  ...Users.map(({id, name}) => {
    const salt = generateSalt()
    return {
      id,
      passwordSalt: salt,
      passwordHash: digestPassword(name, salt),
      user: {$$entity: true, $$as: 'User', id}
    }
  })
]
