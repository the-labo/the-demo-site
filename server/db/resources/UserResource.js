/**
 * @class UserResource
 * @augments Resource
 */
'use strict'

const {TheUserResource} = require('the-site-resources')

/** @lends UserResource */
class UserResource extends TheUserResource {

}

Object.assign(UserResource, {})

module.exports = UserResource
