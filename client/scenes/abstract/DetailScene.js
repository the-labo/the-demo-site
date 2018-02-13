/**
 * DetailScene
 * @class DetailScene
 */
'use strict'

const {withBusy, withReady} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withReady
class DetailSceneBase extends Scene {}

/** @lends DetailScene */
class DetailScene extends DetailSceneBase {
  async dealWith (id) {
    throw new Error(`Not implemented`)
  }

  @withBusy.while
  @withReady.when
  async doSync () {
    const id = this.get('id')
    const entity = await this.dealWith(id)
    this.set({entity, missing: !entity})
  }
}

module.exports = DetailScene
