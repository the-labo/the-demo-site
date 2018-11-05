/**
 * HashScene
 * @class HashScene
 */
'use strict'

const { withBusy, withReady, withValues } = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withReady
@withValues
class HashSceneBase extends Scene {}

/** @lends HashScene */
class HashScene extends HashSceneBase {
  async dealWith () {
    throw new Error(`Not implemented`)
  }

  @withBusy.while
  @withReady.when
  async doSync () {
    const values = await this.dealWith()
    this.set({ values })
  }
}

module.exports = HashScene
