/**
 * QuitScene
 * @class QuitScene
 */
'use strict'

const Scene = require('./Scene')
const {forScope, withBusy, withEntry,} = require('the-scene-mixins/shim')
const {Urls} = require('@self/conf')

@withBusy
@withEntry
@forScope('quit')
class QuitSceneBase extends Scene {}

/** @lends QuitScene */
class QuitScene extends QuitSceneBase {

  @withBusy.while
  async doQuit () {
    const quitCtrl = await this.use('quitCtrl')
    await quitCtrl.execute()
  }

  goToCancel () {
    this.goTo(Urls.TOP_URL)
  }

}

module.exports = QuitScene
