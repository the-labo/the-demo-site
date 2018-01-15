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
  @withBusy.while
  async doReload () {
    this.reloadLocation()
  }
}

module.exports = CautionDisconnectedScene
