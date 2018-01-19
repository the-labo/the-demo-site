/**
 * Create a new handle
 * @function create
 * @returns {TheHandle}
 */
'use strict'

const theHandle = require('the-handle/shim').default
const {SceneMapping,} = require('../mappings')

/** @lends create */
module.exports = function create () {
  return theHandle({
    scenes: SceneMapping
  })
}
