/**
 * @abstract
 * @class Scene
 */
'use strict'

const {TheScene} = require('the-scene-base/shim')
const {resolveUrl} = require('the-site-util')
const cn = require('./concerns')
const {isProduction} = require('the-check')

const SceneBase = cn.compose(

)(TheScene)

/** @lends Scene */
class Scene extends SceneBase {
  goTo (url, params = {}) {
    super.goTo(resolveUrl(url, params))
  }

  async use (name) {
    return this.client.use(name, {
      debug: !isProduction()
    })
  }

  catchError (e) {
    const {store, l} = this
    try {
      return super.catchError(e)
    } catch (e) {
      store.toast.error.push(l('errors.UNEXPECTED_ERROR'))
    }
  }

  catchEntryError (e) {
    try {
      return super.catchEntryError(e)
    } catch (e) {
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

}

module.exports = Scene
