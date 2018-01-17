/**
 * QuitScene
 * @class QuitScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withEntry,} = require('the-scene-mixins/shim')
const {Urls} = require('@self/conf')

@withBusy
@withEntry
@bindScope('quit')
class QuitSceneBase extends Scene {}

/** @lends QuitScene */
class QuitScene extends QuitSceneBase {

  @withBusy.while
  async doQuit () {
    const {quitCtrl} = this.controllers
    await quitCtrl.execute()
  }

  goToCancel () {
    this.goTo(Urls.TOP_URL)
  }

}

module.exports = QuitScene
