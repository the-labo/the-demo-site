/**
 * @class ProfileResource
 * @augments Resource
 */
'use strict'

const {Resource, DataTypes} = require('the-db')
const {STRING, ENTITY, BOOLEAN} = DataTypes
const regexEmail = require('regex-email')
const {withUser} = require('../mixins')

/** @lends ProfileResource */
class ProfileResource extends Resource {
  static get policy () {
    return {
      name: {
        description: 'Display Name',
        type: STRING,
        pattern: /^[a-z][a-z0-9_-]*$/,
        trim: true
      },
      email: {
        description: 'Email of user',
        type: STRING,
        pattern:regexEmail,
        trim: true
      },
      emailVerified: {
        description: 'Email has verified or not',
        type: BOOLEAN
      },
      user: {
        description: 'User',
        type: ENTITY,
        required: true,
        unique: true
      }
    }
  }

  static entityClass (ResourceEntity) {
    /** @class */
    class TheProfileResourceEntity extends ResourceEntity {
    }

    return TheProfileResourceEntity
  }
}

Object.assign(ProfileResource, {})

module.exports = withUser(
  ProfileResource
)
