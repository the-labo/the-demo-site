/**
 * @class RoleResource
 * @augments Resource
 */
'use strict'

const {Resource, DataTypes} = require('the-db')
const {STRING} = DataTypes
const {RoleCodes} = require('@self/conf')
const {withCode} = require('../concerns')

/** @lends RoleResource */
class RoleResource extends Resource {

  static get codes () {
    return RoleCodes
  }

  static get policy () {
    return {
      code: {
        description: 'Role code',
        type: STRING,
        oneOf: Object.values(this.codes),
        required: true
      }
    }
  }

  static entityClass (ResourceEntity) {
    /** @class */
    class RoleResourceEntity extends ResourceEntity {
    }

    return RoleResourceEntity
  }
}

Object.assign(RoleResource, {})

module.exports = withCode(
  RoleResource
)
