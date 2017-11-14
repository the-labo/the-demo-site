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
