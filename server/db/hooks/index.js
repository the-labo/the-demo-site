/**
 * DB hook creators
 * @module hook
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get UserHook () { return _d(require('./UserHook')) },
}
