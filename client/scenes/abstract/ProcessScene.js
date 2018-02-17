/**
 * ProcessScene
 * @class ProcessScene
 */
'use strict'

const {withBusy, withResult, withTargets} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withResult
@withTargets
class ProcessSceneBase extends Scene {}

/** @lends ProcessScene */
class ProcessScene extends ProcessSceneBase {
  async dealWith (targetIds) {
    throw new Error(`Not implemented`)
  }

  @withBusy.while
  @withResult.save
  async doExec () {
    const targetIds = this.getTargetIds()
    return await this.dealWith(targetIds)
  }
}

module.exports = ProcessScene
