/**
 * Db resource classes
 * @module resources
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get AliasResource () { return _d(require('./AliasResource')) },
  get HistoryResource () { return _d(require('./HistoryResource')) },
  get ProfileResource () { return _d(require('./ProfileResource')) },
  get RoleResource () { return _d(require('./RoleResource')) },
  get SignResource () { return _d(require('./SignResource')) },
  get TokenResource () { return _d(require('./TokenResource')) },
  get UserResource () { return _d(require('./UserResource')) },
}
