/**
 * @abstract
 * @class Scene
 */
'use strict'

const {TheScene} = require('the-scene-base/shim')
const {urlUtil} = require('@self/utils')
const qs = require('qs')

class Scene extends TheScene {

  goTo (url, params) {
    const resolved = urlUtil.resolveUrl(url, params)
    super.goTo(resolved)
  }

  async use (name) {
    const s = this
    return s.client.use(name)
  }

  catchError (e) {
    const s = this
    const {store, l} = s
    try {
      s.catchEntryError(e)
    } catch (e) {
      store.toast.error.push(l('errors.UNEXPECTED_ERROR'))
    }
  }

  replaceQuery (query) {
    const s = this
    s.history.replace({search: '?' + qs.stringify(query)})
  }

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
