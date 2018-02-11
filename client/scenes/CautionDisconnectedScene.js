/**
 * CautionDisconnectedScene
 * @class CautionDisconnectedScene
 */
'use strict'

const {bindScope, withBusy, withLocation} = require('the-scene-mixins/shim')
const Scene = require('./abstract/Scene')

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
