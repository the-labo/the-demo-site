/**
 * @abstract
 * @class Scene
 */
'use strict'

const {TheScene} = require('the-scene-base/shim')
const {urlUtil} = require('@self/utils')

class Scene extends TheScene {

  get scope () {
    const s = this
    return null
  }

  init () {
    const s = this
    for (const name of Object.keys(s.scope || {})) {
      const scope = s.scope[name]
      scope.init()
    }
  }

  get (name) {
    const s = this
    return s.scope.get(name)
  }

  set (name, value) {
    const s = this
    s.scope.set(name, value)
  }

  merge (name, value) {
    const s = this
    s.scope.set(
      name,
      Object.assign({}, s.get(name), value)
    )
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
