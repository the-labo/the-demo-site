/**
 * SignaskScene
 * @class SignaskScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

const SignaskSceneBase = cn.compose(
  cn.withBusy
)(Scene)

/** @lends SignaskScene */
class SignaskScene extends SignaskSceneBase {
  get scope () {
    return this.store.signAsk
  }
}

module.exports = SignaskScene
