/**
 * Service mapping
 * @namespace ServiceMapping
 */
'use strict'

const sv = require('../services')

module.exports = Object.freeze({
  'accountService': sv.AccountService,
  'quitService': sv.QuitService,
  'recoverService': sv.RecoverService,
  'signService': sv.SignService,
  'userService': sv.UserService,
  'verifyService': sv.VerifyService,
})
