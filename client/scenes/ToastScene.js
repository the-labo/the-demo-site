/**
 * ToastScene
 * @class ToastScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, siteToast,} = require('the-scene-mixins/shim')

@bindScope('toast')
@siteToast
class ToastSceneBase extends Scene {}

/** @lends ToastScene */
class ToastScene extends ToastSceneBase {

}

module.exports = ToastScene
