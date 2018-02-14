/**
 * DetailScene
 * @class DetailScene
 */
'use strict'

const {withBusy, withId, withReady} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withReady
class DetailSceneBase extends Scene {}

/** @lends DetailScene */
class DetailScene extends DetailSceneBase {
  isKnownId (id) {
    if (!id) {
      return false
    }
    return this.get('id') === String(id)
  }

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

  async requestToSyncFor (id) {
    if (this.isKnownId(id)) {
      return null
    }
    this.set({id})
    await this.doSync()
    return this.get('entity')
  }
}

module.exports = DetailScene
