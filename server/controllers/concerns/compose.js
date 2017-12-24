/**
 * Compose multiple mixins into one
 * @function compose
 * @param {...function} mixins
 * @returns {function} Composed mixin
 */
'use strict'

const {compose} = require('the-controller-base')

/** @lends compose */
module.exports = compose
