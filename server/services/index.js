/**
 * Server services
 * @module services
 */
'use strict'

const AccountService = require('./AccountService')
const QuitService = require('./QuitService')
const RecoverService = require('./RecoverService')
const SignService = require('./SignService')
const UserService = require('./UserService')
const VerifyService = require('./VerifyService')

module.exports = {
  AccountService,
  QuitService,
  RecoverService,
  SignService,
  UserService,
  VerifyService
}

exports.AccountService = AccountService
exports.QuitService = QuitService
exports.RecoverService = RecoverService
exports.SignService = SignService
exports.UserService = UserService
exports.VerifyService = VerifyService
