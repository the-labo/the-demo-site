/**
 * Server controllers
 * @module controllers
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const AccountCtrl = _d(require('./AccountCtrl'))
const AdminCtrl = _d(require('./AdminCtrl'))
const AppCtrl = _d(require('./AppCtrl'))
const Ctrl = _d(require('./Ctrl'))
const QuitCtrl = _d(require('./QuitCtrl'))
const RecoverCtrl = _d(require('./RecoverCtrl'))
const SignCtrl = _d(require('./SignCtrl'))
const UserCtrl = _d(require('./UserCtrl'))
const VerifyCtrl = _d(require('./VerifyCtrl'))

module.exports = {
  AccountCtrl,
  AdminCtrl,
  AppCtrl,
  Ctrl,
  QuitCtrl,
  RecoverCtrl,
  SignCtrl,
  UserCtrl,
  VerifyCtrl,
}
