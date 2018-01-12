/**
 * QuitCtrl
 * @class QuitCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const {compose, withDebug} = require('the-controller-mixins')
const {withAuth} = require('./concerns')

/** @lends QuitCtrl */
const QuitCtrl = compose(
  withDebug,
  withAuth
)(
  class QuitCtrlBase extends Ctrl {
    async execute () {
      const {quitService} = this.services
      await this._reloadAuthorized()
      const user = await this._fetchAuthorizedUser()
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
