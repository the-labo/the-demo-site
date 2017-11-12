/**
 * AdminCtrl
 * @class AdminCtrl
 */
'use strict'

const {TheCtrl} = require('the-controller-base')
const cn = require('./concerns')

/** @lends AdminCtrl */
const AdminCtrl = cn.compose(
  cn.withAuthorized,
  cn.withDebug
)(
  class AdminCtrlBase extends TheCtrl {
    async confirmAsAdmin (password) {
      const s = this
      const {
        db: {
          resources: {Sign}
        }
      } = s.app
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
)

module.exports = AdminCtrl
