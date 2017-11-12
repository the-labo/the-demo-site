/**
 * Server controllers
 * @module controllers
 */
'use strict'

const AccountCtrl = require('./AccountCtrl')
const AdminCtrl = require('./AdminCtrl')
const AppCtrl = require('./AppCtrl')
const RecoverCtrl = require('./RecoverCtrl')
const SignCtrl = require('./SignCtrl')
const UserMasterCtrl = require('./UserMasterCtrl')
const VerifyCtrl = require('./VerifyCtrl')

module.exports = {
  AccountCtrl,
  AdminCtrl,
  AppCtrl,
  RecoverCtrl,
  SignCtrl,
  UserMasterCtrl,
  VerifyCtrl
}
