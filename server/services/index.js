/**
 * Server services
 * @module services
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const AccountService = _d(require('./AccountService'))
const QuitService = _d(require('./QuitService'))
const RecoverService = _d(require('./RecoverService'))
const SignService = _d(require('./SignService'))
const UserService = _d(require('./UserService'))
const VerifyService = _d(require('./VerifyService'))

module.exports = {
  AccountService,
  QuitService,
  RecoverService,
  SignService,
  UserService,
  VerifyService,
}
