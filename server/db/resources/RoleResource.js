/**
 * @class RoleResource
 * @augments Resource
 */
'use strict'

const {Resource, DataTypes} = require('the-db')
const {STRING} = DataTypes
const {RoleCodes} = require('@self/conf')
const {withCode} = require('../mixins')

/** @lends RoleResource */
class RoleResource extends Resource {

  static get policy () {
    return {
      code: {
        description: 'Role code',
        type: STRING,
        oneOf: Object.keys(RoleCodes).map((key) => RoleCodes[key]),
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
