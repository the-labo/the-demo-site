/**
 * CreateScene
 * @class CreateScene
 */
'use strict'

const { clone } = require('asobj')
const { withBusy, withEntry, withResult } = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withEntry
@withResult
class InputSceneBase extends Scene {}

/** @lends InputScene */
class InputScene extends InputSceneBase {
  setEntryFromEntity (entity) {
    const values = clone(entity || {}, {
      without: this.constructor.entitySkipFields,
    })
    this.setEntry(values)
  }

  async dealWith (values) {
    throw new Error(`Not implemented`)
  }

  @withBusy.while
  @withResult.save
  async doExec () {
    return await this.processEntry((values) =>
      this.dealWith(values)
    )
  }

  static entitySkipFields = [/^\$/]
}

module.exports = InputScene
