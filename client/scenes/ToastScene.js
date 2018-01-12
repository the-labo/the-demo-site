/**
 * ToastScene
 * @class ToastScene
 */
'use strict'

const Scene = require('./Scene')
const {compose} =  require('the-scene-mixins/shim')

const ToastSceneBase = compose(

)(Scene)

/** @lends ToastScene */
class ToastScene extends ToastSceneBase {
  get scope () {
    return this.store.toast
  }

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
