/**
 * Controller mapping
 * @namespace ControllerMapping
 */
'use strict'

const c = require('./controllers')

module.exports = Object.freeze({
  'accountCtrl': c.AccountCtrl,
  'adminCtrl': c.AdminCtrl,
  'appCtrl': c.AppCtrl,
  'recoverCtrl': c.RecoverCtrl,
  'signCtrl': c.SignCtrl,
  'userMasterCtrl': c.UserMasterCtrl,
  'verifyCtrl': c.VerifyCtrl,
})
