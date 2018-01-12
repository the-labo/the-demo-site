/**
 * Module mappings
 * @module mappings
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const SceneMapping = _d(require('./SceneMapping'))

module.exports = {
  SceneMapping,
}
