/**
 * @class ProfileResource
 * @augments Resource
 */
'use strict'

const {Resource, DataTypes} = require('the-db')
const {STRING, ENTITY, BOOLEAN} = DataTypes
const {withUser} = require('../mixins')

/** @lends ProfileResource */
class ProfileResource extends Resource {

  async userWithEmail (email) {
    const Profile = this
    const profile = await Profile.first({email})
    return profile ? profile.user : null
  }

  static get policy () {
    return {
      name: {
        description: 'Display Name',
        type: STRING,
        trim: true
      },
      email: {
        description: 'Email of user',
        type: STRING,
        unique: true,
        trim: true
      },
      emailVerified: {
        description: 'Email has verified or not',
        type: BOOLEAN,
        default: () => false
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
    class ProfileResourceEntity extends ResourceEntity {
    }

    return ProfileResourceEntity
  }
}

Object.assign(ProfileResource, {})

module.exports = withUser(
  ProfileResource
)
