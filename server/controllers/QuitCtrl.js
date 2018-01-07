/**
 * QuitCtrl
 * @class QuitCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const cn = require('./concerns')

/** @lends QuitCtrl */
const QuitCtrl = cn.compose(
  cn.withDebug,
  cn.withAuth
)(
  class QuitCtrlBase extends Ctrl {
    async execute () {
      const s = this
      const {quitService} = s.services
      await s._reloadAuthorized()
      const user = await s._fetchAuthorizedUser()
      if (!user) {
        return false
      }
      const {destroyed} = await quitService.processQuit({
        userId: user.id
      })

      return destroyed
    }

  }
)

module.exports = QuitCtrl
