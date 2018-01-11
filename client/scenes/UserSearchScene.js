/**
 * UserSearchScene
 * @class UserSearchScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends UserSearchScene */
const UserSearchScene = cn.compose(
  cn.withBusy,
  cn.withEntry
)(
  class UserSearchSceneBase extends Scene {
    get scope () {
      return this.store.userSearch
    }
  }
)

module.exports = UserSearchScene
