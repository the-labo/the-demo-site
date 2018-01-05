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
        minLength: 2,
        pattern: /^[a-z0-9_\-@]*$/,
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
    class UserResourceEntity extends ResourceEntity {
      hasRoleOf (code) {
        const user = this
        const {role} = user
        return role && role.code === code
      }
    }

    return UserResourceEntity
  }
}

Object.assign(UserResource, {})

module.exports = UserResource
