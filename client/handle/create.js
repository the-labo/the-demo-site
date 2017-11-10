/**
 * Create a new handle
 * @function create
 * @returns {TheHandle}
 */
'use strict'

const theHandle = require('the-handle')
const sc = require('../scenes')

/** @lends create */
module.exports = function create () {
  const handle = theHandle({})

  handle.load(sc.AccountScene, 'accountScene')
  handle.load(sc.AdminUsersScene, 'adminUsersScene')
  handle.load(sc.HomeScene, 'homeScene')
  handle.load(sc.RecoverScene, 'recoverScene')
  handle.load(sc.SignScene, 'signScene')
  handle.load(sc.ToastScene, 'toastScene')
  handle.load(sc.VerifyScene, 'verifyScene')

  return handle
}
