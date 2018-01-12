/**
 * Compose multiple mixins into one
 * @function compose
 * @param {...function|Array} mixins
 * @returns {function} Composed mixin
 */
'use strict'

const {compose} = require('the-scene-base').concerns

/** @lends compose */
module.exports = compose
