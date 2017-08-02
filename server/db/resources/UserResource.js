/**
 * @class UserResource
 * @augments Resource
 */
'use strict'

const {Resource, DataTypes} = require('the-db')
const {STRING, ENTITY, DATE} = DataTypes

/** @lends UserResource */
class UserResource extends Resource {

  static get policy () {
    return {
      name: {
        description: 'Name of resource',
        type: STRING,
        unique: true,
        required: true,
        trim: true,
        minLength: 2
      },
      profile: {
        description: 'User profile',
        type: ENTITY
      },
      role: {
        description: 'User Role',
        type: ENTITY
      },
      createdAt: {
        description: 'Created date',
        type: DATE,
        default: () => new Date()
      }
    }
  }

  static entityClass (ResourceEntity) {
    /** @class */
    class TheUserResourceEntity extends ResourceEntity {
    }

    return TheUserResourceEntity
  }
}

Object.assign(UserResource, {})

module.exports = UserResource
