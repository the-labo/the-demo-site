/**
 * @abstract
 * @class Scene
 */
'use strict'

const {TheScene,} = require('the-scene-base/shim')
const {resolveUrl,} = require('the-site-util')

class SceneBase extends TheScene {}

/** @lends Scene */
class Scene extends SceneBase {
  catchEntryError (e) {
    try {
      return super.catchEntryError(e)
    } catch (e) {
      switch (e.name) {
        case 'NotFoundError': {
          return this.parseAppError(e, {
            defaultMessageKey: 'RESOURCE_NOT_FOUND_ERROR',
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

  catchError (e) {
    const {l, store,} = this
    try {
      return super.catchError(e)
    } catch (e) {
      store.toast.error.push(l('errors.UNEXPECTED_ERROR'))
    }
  }

  goTo (url, params = {}) {
    super.goTo(resolveUrl(url, params))
  }

}

module.exports = Scene
