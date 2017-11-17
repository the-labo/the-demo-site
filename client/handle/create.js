/**
 * Create a new handle
 * @function create
 * @returns {TheHandle}
 */
'use strict'

const theHandle = require('the-handle')
const {SceneMapping} = require('../mappings')

/** @lends create */
module.exports = function create () {
  const handle = theHandle({})

  for (const [name, Scene] of Object.entries(SceneMapping)) {
    handle.load(Scene, name)
  }

  return handle
}
