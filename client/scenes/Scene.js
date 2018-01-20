/**
 * @abstract
 * @class Scene
 */
'use strict'

const {TheScene} = require('the-scene-base/shim')
const {rescue} = require('the-decorators')

class SceneBase extends TheScene {}

/** @lends Scene */
class Scene extends SceneBase {

  @rescue((e, {instance}) => instance.handleError(e))
  catchError (e) {
    return super.catchError(e)
  }

  @rescue((e, {instance}) => instance.handleError(e))
  catchEntryError (e) {
    return super.catchEntryError(e)
  }

  handleError (e) {
    switch (e.name) {
      case 'NotFoundError': {
        return this.parseAppError(e, {
          defaultMessageKey: 'RESOURCE_NOT_FOUND_ERROR'
        })
      }
      case 'WrongPasswordError': {
        return this.parseAppError(e, {})
      }
      default:
        throw e
    }
  }
}

module.exports = Scene
