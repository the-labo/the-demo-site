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
      const s = this
      return s.store.sign.signask
    }
  }
)

module.exports = SignaskScene
