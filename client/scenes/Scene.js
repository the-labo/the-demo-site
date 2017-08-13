/**
 * @abstract
 * @class Scene
 */
'use strict'

const {TheScene} = require('the-scene-base/shim')

class Scene extends TheScene {
  parsePolicyError (e) {
    try {
      super.parsePolicyError(e)
    } catch (e) {
      switch (e.name) {

        // Custom error handling

        default:
          throw e
      }
    }
  }
}

module.exports = Scene
