/**
 * @class ProfileResource
 * @augments Resource
 */
'use strict'

const {Resource, DataTypes} = require('the-db')
const {STRING, ENTITY} = DataTypes

const {withUser} = require('../mixins')

/** @lends ProfileResource */
class ProfileResource extends Resource {
  static get policy () {
    return {
      name: {
        description: 'Display Name',
        type: STRING,
        trim: true
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
