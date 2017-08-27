/**
 * @abstract
 * @class Scene
 */
'use strict'

const {TheScene} = require('the-scene-base/shim')

class Scene extends TheScene {
  catchEntryError (e) {
    const s = this
    try {
      return super.catchEntryError(e)
    } catch (e) {
      switch (e.name) {
        case 'NotFoundError': {
          return s.parseAppError(e, {
            defaultMessageKey: 'RESOURCE_NOT_FOUND_ERROR'
          })
        }
        case 'WrongPasswordError': {
          return s.parseAppError(e, {})
        }

        default:
          throw e
      }
    }
  }
}

module.exports = Scene
