/**
 * CautionDisconnectedScene
 * @class CautionDisconnectedScene
 */
'use strict'

const Scene = require('./Scene')
const {forScope, withBusy, withLocation} = require('the-scene-mixins/shim')

@withBusy
@withLocation
@forScope('cautionDisconnected')
class CautionDisconnectedSceneBase extends Scene {}

/** @lends CautionDisconnectedScene */
class CautionDisconnectedScene extends CautionDisconnectedSceneBase {

  async doReload () {
    this.set({busy: true})
    this.reloadLocation()
  }
}

module.exports = CautionDisconnectedScene
