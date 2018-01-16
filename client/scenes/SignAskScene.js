/**
 * SignaskScene
 * @class SignaskScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy} = require('the-scene-mixins/shim')

@withBusy
@bindScope('signAsk')
class SignaskSceneBase extends Scene {}

/** @lends SignaskScene */
class SignaskScene extends SignaskSceneBase {
}

module.exports = SignaskScene
