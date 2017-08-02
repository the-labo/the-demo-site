/**
 * @abstract
 * @class Scene
 */
'use strict'

const { errorMix, goMix } = require('./mixins')

const SceneBase = [
  errorMix,
  goMix
].reduce((Clazz, mix) => mix(Clazz), class Root {})

class Scene extends SceneBase {
  constructor ({ store, client, l, history }) {
    super()
    const s = this
    s.store = store
    s.client = client
    s.history = history
    s.l = l
  }
}

module.exports = Scene
