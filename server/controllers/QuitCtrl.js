/**
 * QuitCtrl
 * @class QuitCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const {compose, withDebug} = require('the-controller-mixins')
const {withAuth} = require('./concerns')

const QuitCtrlBase = compose(
  withDebug,
  withAuth
)(Ctrl)

/** @lends QuitCtrl */
class QuitCtrl extends QuitCtrlBase {
  async execute () {
    const {
      services: {quitService}
    } = this
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

module.exports = QuitCtrl
