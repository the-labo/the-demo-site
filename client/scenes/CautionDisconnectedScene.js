/**
 * CautionDisconnectedScene
 * @class CautionDisconnectedScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withLocation} = require('the-scene-mixins/shim')

@withBusy
@withLocation
@bindScope('caution.disconnected')
class CautionDisconnectedSceneBase extends Scene {}

/** @lends CautionDisconnectedScene */
class CautionDisconnectedScene extends CautionDisconnectedSceneBase {
  @withBusy.while
  async doReload () {
    await this.reloadLocation()
  }
}

module.exports = CautionDisconnectedScene
