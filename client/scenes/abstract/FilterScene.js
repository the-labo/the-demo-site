/**
 * FilterScene
 * @class FilterScene
 */
'use strict'

const {withBusy, withEntry} = require('the-scene-mixins/shim')
const Scene = require('./Scene')

@withBusy
@withEntry
class FilterSceneBase extends Scene {}

/** @lends FilterScene */
class FilterScene extends FilterSceneBase {
}

module.exports = FilterScene
