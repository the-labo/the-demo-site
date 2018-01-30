/**
 * QuitCtrl
 * @class QuitCtrl
 */
'use strict'

const {compose, } = require('the-controller-mixins')
const Ctrl = require('./Ctrl')

const QuitCtrlBase = compose(

)(Ctrl)

/** @lends QuitCtrl */
class QuitCtrl extends QuitCtrlBase {
  async execute () {
    const {
      services: {quitService,},
      user,
    } = this
    await this._reloadAuthorized()
    if (!user) {
      return false
    }
    const {destroyed,} = await quitService.processQuit({
      userId: user.id,
    })
    return destroyed
  }

}

module.exports = QuitCtrl
