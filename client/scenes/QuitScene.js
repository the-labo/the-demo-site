/**
 * QuitScene
 * @class QuitScene
 */
'use strict'

const {bindScope, withBusy} = require('the-scene-mixins/shim')
const {Urls} = require('@self/conf')
const CallScene = require('./abstract/CallScene')

@bindScope('quit')
class QuitSceneBase extends CallScene {}

/** @lends QuitScene */
class QuitScene extends QuitSceneBase {

  goToCancel () {
    this.goTo(Urls.TOP_URL)
  }

  async dealWith () {
    const {quitCtrl} = this.controllers
    return await quitCtrl.execute()
  }

}

module.exports = QuitScene
