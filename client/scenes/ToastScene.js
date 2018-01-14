/**
 * ToastScene
 * @class ToastScene
 */
'use strict'

const Scene = require('./Scene')
const {forScope} = require('the-scene-mixins/shim')

@forScope('toast')
class ToastSceneBase extends Scene {}

/** @lends ToastScene */
class ToastScene extends ToastSceneBase {

  showInfo (message) {
    this.scope.info.push(message)
  }

  showWarn (message) {
    this.scope.warn.push(message)
  }

  showError (message) {
    this.scope.error.push(message)
  }

  reset (queues) {
    for (const [name, queue] of Object.entries(queues)) {
      this.scope[name].reset(queue)
    }
  }
}

module.exports = ToastScene
