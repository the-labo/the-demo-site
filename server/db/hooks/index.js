/**
 * DB hook creators
 * @module hook
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const UserHook = _d(require('./UserHook'))

module.exports = {
  UserHook,
}
