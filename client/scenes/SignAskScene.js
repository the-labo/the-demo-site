/**
 * SignaskScene
 * @class SignaskScene
 */
'use strict'

const { bindScope, withBack, withBusy } = require('the-scene-mixins/shim')
const Scene = require('./abstract/Scene')

@withBusy
@withBack
@bindScope('sign.ask')
class SignaskSceneBase extends Scene {}

/** @lends SignaskScene */
class SignaskScene extends SignaskSceneBase {
}

module.exports = SignaskScene
