/**
 * withBack mixin
 * @function withBack
 * @param {function} Class - Class to mix
 * @returns {function} Mixed class
 */
'use strict'

const {Urls} = require('@self/conf')
const {withBack} = require('the-scene-base/shim')

module.exports = (Class) => withBack(Class, {
  top: Urls.TOP_URL
})
