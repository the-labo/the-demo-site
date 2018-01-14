/**
 * SignaskScene
 * @class SignaskScene
 */
'use strict'

const Scene = require('./Scene')
const {forScope, withBusy} = require('the-scene-mixins/shim')

@withBusy
@forScope('signAsk')
class SignaskSceneBase extends Scene {}

/** @lends SignaskScene */
class SignaskScene extends SignaskSceneBase {
}

module.exports = SignaskScene
