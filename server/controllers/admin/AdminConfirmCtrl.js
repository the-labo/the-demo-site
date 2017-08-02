/**
 * AdminConfirmCtrl
 * @class AdminConfirmCtrl
 */
'use strict'

const AdminCtrl = require('./AdminCtrl')
const {withDebug} = require('../concerns')

/** @lends AdminConfirmCtrl */
class AdminConfirmCtrl extends AdminCtrl {
  async confirmAsAdmin (password) {
    const s = this
    const {app} = s
    const {Sign} = app.db.resources
    s._assertSigned()
    const {signed} = s._getSigned()
    const sign = await Sign.one(signed.sign.id)
    const ok = sign.verifyPassword(password)
    if (ok) {
      s._setConfirmedAsAdmin(true)
    }
    return ok
  }
}

module.exports = withDebug(
  AdminConfirmCtrl, 'app:adminCtrl'
)
