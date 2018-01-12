/**
 * withFailure mixin
 * @function withFailure
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const {withFailure} = require('the-scene-base').concerns

/** @lends withFailure */
module.exports = withFailure
