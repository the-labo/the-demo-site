/**
 * SignaskScene
 * @class SignaskScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withBusy} =  require('the-scene-mixins/shim')

const SignaskSceneBase = compose(
  withBusy
)(Scene)

/** @lends SignaskScene */
class SignaskScene extends SignaskSceneBase {
  get scope () {
    return this.store.signAsk
  }
}

module.exports = SignaskScene
