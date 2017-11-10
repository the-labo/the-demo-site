/**
 * AdminCtrl
 * @class AdminCtrl
 */
'use strict'

const { TheCtrl } = require('the-controller-base')
const {withDebug, withAuthorized} = require('../concerns')

/** @lends AdminCtrl */
class AdminCtrl extends TheCtrl {
  async confirmAsAdmin (password) {
    const s = this
    const {app} = s
    const {Sign} = app.db.resources
    await s._assertAuthorized()
    const {signed} = await s._getAuthorized()
    const sign = await Sign.one(signed.sign.id)
    const ok = sign.verifyPassword(password)
    if (ok) {
      await s._setConfirmedAsAdmin(true)
    }
    return ok
  }
}

module.exports = withDebug(
  withAuthorized(
    AdminCtrl
  )
)
