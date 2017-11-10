/**
 * Server controllers
 * @module controllers
 */
'use strict'

const AdminCtrl = require('./AdminCtrl')
const AppCtrl = require('./AppCtrl')
const AuthCtrl = require('./AuthCtrl')
const MasterCtrl = require('./master/MasterCtrl')
const UserMasterCtrl = require('./master/UserMasterCtrl')
const UserMasterCtrl = require('./masters/UserMasterCtrl')
const RecoverCtrl = require('./RecoverCtrl')
const VerifyCtrl = require('./VerifyCtrl')

module.exports = {
  AdminCtrl,
  AppCtrl,
  AuthCtrl,
  MasterCtrl,
  UserMasterCtrl,
  UserMasterCtrl,
  RecoverCtrl,
  VerifyCtrl
}
