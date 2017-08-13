/**
 * Server controllers
 * @module controllers
 */
'use strict'

const AdminConfirmCtrl = require('./admin/AdminConfirmCtrl')
const AdminCtrl = require('./admin/AdminCtrl')
const AdminUsersCtrl = require('./admin/AdminUsersCtrl')
const AppCtrl = require('./AppCtrl')
const RecoverCtrl = require('./RecoverCtrl')
const SignCtrl = require('./SignCtrl')
const VerifyCtrl = require('./VerifyCtrl')

module.exports = {
  AdminConfirmCtrl,
  AdminCtrl,
  AdminUsersCtrl,
  AppCtrl,
  RecoverCtrl,
  SignCtrl,
  VerifyCtrl
}
