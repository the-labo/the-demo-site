/**
 * SignaskScene
 * @class SignaskScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')
/** @lends SignaskScene */
const SignaskScene = cn.compose(
  cn.withBusy
)(
  class SignaskSceneBase extends Scene {
    get scope () {
      return this.store.signAsk
    }
  }
)

module.exports = SignaskScene
