/**
 * @extends TheService
 * @class UserService
 */
'use strict'

const { TheUserService } = require('the-site-services')

/** @lends UserService */
class UserService extends TheUserService {
}

module.exports = UserService
