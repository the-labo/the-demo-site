/**
 * QuitScene
 * @class QuitScene
 */
'use strict'

const {bindScope, withBusy, withEntry} = require('the-scene-mixins/shim')
const {Urls} = require('@self/conf')
const Scene = require('./Scene')

@withBusy
@withEntry
@bindScope('quit')
class QuitSceneBase extends Scene {}

/** @lends QuitScene */
class QuitScene extends QuitSceneBase {

  goToCancel () {
    this.goTo(Urls.TOP_URL)
  }

  @withBusy.while
  async doQuit () {
    const {quitCtrl} = this.controllers
    await quitCtrl.execute()
  }

}

module.exports = QuitScene
