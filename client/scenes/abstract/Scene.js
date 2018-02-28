/**
 * Base scene
 * @abstract
 * @class Scene
 */
'use strict'

const {TheScene} = require('the-scene-base/shim')
const {withLocation} = require('the-scene-mixins/shim')
const {resolveUrl} = require('the-site-util')

class SceneBase extends TheScene {}

/** @lends Scene */
@withLocation
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
    const {l, store} = this
    try {
      return super.catchError(e)
    } catch (e) {
      store.toast.error.push(l('errors.UNEXPECTED_ERROR'))
    }
  }

  goTo (url, params = {}, options = {}) {
    const {query = {}, reload = false} = options
    const href = resolveUrl(url, params, {query})
    if (reload) {
      this.store.app.busy.true()
      super.goTo(href)
      this.reloadLocation().catch((e) => {
        this.store.app.busy.false()
      })
    } else {
      super.goTo(href)
    }
  }

}

module.exports = Scene
