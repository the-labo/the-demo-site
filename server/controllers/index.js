/**
 * Server controllers
 * @module controllers
 */
'use strict'

const AdminConfirmCtrl = require('./admin/AdminConfirmCtrl')
const AdminCtrl = require('./admin/AdminCtrl')
const AdminUsersCtrl = require('./admin/AdminUsersCtrl')
const AppCtrl = require('./AppCtrl')
const SignCtrl = require('./SignCtrl')

module.exports = {
  AdminConfirmCtrl,
  AdminCtrl,
  AdminUsersCtrl,
  AppCtrl,
  SignCtrl
}
