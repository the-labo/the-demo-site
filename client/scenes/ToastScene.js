/**
 * ToastScene
 * @class ToastScene
 */
'use strict'

const Scene = require('./Scene')
const {Urls} = require('@self/conf')

/** @lends ToastScene */
class ToastScene extends Scene {
  get scope () {
    const s = this
    return s.store['toast']
  }

  showInfo (message) {
    const s = this
    s.scope.info.push(message)
  }

  showWarn (message) {
    const s = this
    s.scope.warn.push(message)
  }

  showError (message) {
    const s = this
    s.scope.error.push(message)
  }

  reset (queues) {
    const s = this
    for (const [name, queue] of Object.entries(queues)) {
      s.scope[name].reset(queue)
    }
  }
}

module.exports = ToastScene
