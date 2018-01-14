/**
 * @class RoleResource
 * @augments Resource
 */
'use strict'

const {TheRoleResource} = require('the-site-resources')
const {RoleCodes} = require('@self/conf')

/** @lends RoleResource */
class RoleResource extends TheRoleResource {

  static get codes () {
    return RoleCodes
  }
}

module.exports = RoleResource