/**
 * Controller mapping
 * @namespace ControllerMapping
 */
'use strict'

const c = require('../controllers')

module.exports = Object.freeze({
  'accountCtrl': c.AccountCtrl,
  'adminUserCtrl': c.AdminUserCtrl,
  'adminCtrl': c.AdminCtrl,
  'appCtrl': c.AppCtrl,
  'quitCtrl': c.QuitCtrl,
  'recoverCtrl': c.RecoverCtrl,
  'signCtrl': c.SignCtrl,
  'verifyCtrl': c.VerifyCtrl,
})
