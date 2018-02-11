/**
 * QuitScene
 * @class QuitScene
 */
'use strict'

const {bindScope, withBusy} = require('the-scene-mixins/shim')
const {Urls} = require('@self/conf')
const Scene = require('./abstract/Scene')

@withBusy
@bindScope('quit')
class QuitSceneBase extends Scene {}

/** @lends QuitScene */
class QuitScene extends QuitSceneBase {

  goToCancel () {
    this.goTo(Urls.TOP_URL)
  }

  @withBusy.while
  async doExec () {
    const {quitCtrl} = this.controllers
    await quitCtrl.execute()
  }

}

module.exports = QuitScene
