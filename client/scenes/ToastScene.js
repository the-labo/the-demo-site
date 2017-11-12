/**
 * ToastScene
 * @class ToastScene
 */
'use strict'

const Scene = require('./Scene')
const {Urls} = require('@self/conf')

/** @lends ToastScene */
class ToastScene extends Scene {
  showInfo (message) {
    const s = this
    s.store.toast.info.push(message)
  }
}

module.exports = ToastScene
