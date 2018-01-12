/**
 * ja locales
 * @module ja
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const org = _d(require('./org'))

module.exports = {
  org,
}
