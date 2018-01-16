/**
 * QuitCtrl
 * @class QuitCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const {compose, } = require('the-controller-mixins')

const QuitCtrlBase = compose(

)(Ctrl)

/** @lends QuitCtrl */
class QuitCtrl extends QuitCtrlBase {
  async execute () {
    const {
      user,
      services: {quitService}
    } = this
    await this._reloadAuthorized()
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
