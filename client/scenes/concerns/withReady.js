/**
 * withReady mixin
 * @function withReady
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const {withReady} = require('the-scene-base/shim')

/** @lends withReady */
module.exports = withReady
