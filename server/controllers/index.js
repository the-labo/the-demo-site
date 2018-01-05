/**
 * Server controllers
 * @module controllers
 */
'use strict'

const AccountCtrl = require('./AccountCtrl')
const AdminCtrl = require('./AdminCtrl')
const AppCtrl = require('./AppCtrl')
const Ctrl = require('./Ctrl')
const PasswordCtrl = require('./PasswordCtrl')
const QuitCtrl = require('./QuitCtrl')
const RecoverCtrl = require('./RecoverCtrl')
const SignCtrl = require('./SignCtrl')
const UserCtrl = require('./UserCtrl')
const VerifyCtrl = require('./VerifyCtrl')

module.exports = {
  AccountCtrl,
  AdminCtrl,
  AppCtrl,
  Ctrl,
  PasswordCtrl,
  QuitCtrl,
  RecoverCtrl,
  SignCtrl,
  UserCtrl,
  VerifyCtrl
}

exports.AccountCtrl = AccountCtrl
exports.AdminCtrl = AdminCtrl
exports.AppCtrl = AppCtrl
exports.Ctrl = Ctrl
exports.PasswordCtrl = PasswordCtrl
exports.QuitCtrl = QuitCtrl
exports.RecoverCtrl = RecoverCtrl
exports.SignCtrl = SignCtrl
exports.UserCtrl = UserCtrl
exports.VerifyCtrl = VerifyCtrl
