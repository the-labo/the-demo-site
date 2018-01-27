/**
 * Module mappings
 * @module mappings
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get SceneMapping () { return _d(require('./SceneMapping')) },
}
