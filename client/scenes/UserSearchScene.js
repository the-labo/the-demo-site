/**
 * UserSearchScene
 * @class UserSearchScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

const UserSearchSceneBase = cn.compose(
  cn.withBusy,
  cn.withEntry
)(Scene)

/** @lends UserSearchScene */
class UserSearchScene extends UserSearchSceneBase {
  get scope () {
    return this.store.userSearch
  }
}

module.exports = UserSearchScene
