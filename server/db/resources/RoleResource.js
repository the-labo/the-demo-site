/**
 * @class RoleResource
 * @augments Resource
 */
'use strict'

const {RoleCodes} = require('@self/conf')
const {TheRoleResource} = require('the-site-resources')

/** @lends RoleResource */
class RoleResource extends TheRoleResource {

  static get codes () {
    return RoleCodes
  }
}

Object.assign(RoleResource, {})

module.exports = RoleResource