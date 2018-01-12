/**
 * UserSearchScene
 * @class UserSearchScene
 */
'use strict'

const Scene = require('./Scene')
const {compose, withBusy, withEntry,} =  require('the-scene-mixins/shim')

const UserSearchSceneBase = compose(
  withBusy,
  withEntry,
)(Scene)

/** @lends UserSearchScene */
class UserSearchScene extends UserSearchSceneBase {
  get scope () {
    return this.store.userSearch
  }
}

module.exports = UserSearchScene
