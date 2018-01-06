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
      const s = this
      return s.store.userSearch
    }
  }
)

module.exports = UserSearchScene
