/**
 * Db resource classes
 * @module resources
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const AliasResource = _d(require('./AliasResource'))
const HistoryResource = _d(require('./HistoryResource'))
const ProfileResource = _d(require('./ProfileResource'))
const RoleResource = _d(require('./RoleResource'))
const SignResource = _d(require('./SignResource'))
const UserResource = _d(require('./UserResource'))

module.exports = {
  AliasResource,
  HistoryResource,
  ProfileResource,
  RoleResource,
  SignResource,
  UserResource,
}
