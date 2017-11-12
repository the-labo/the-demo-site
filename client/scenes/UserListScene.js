/**
 * UserListScene
 * @class UserListScene
 */
'use strict'

const Scene = require('./Scene')
const { Urls } = require('@self/conf')

/** @lends UserListScene */
const UserListScene = class UserListSceneBase extends Scene {
  get scope () {
    const s = this
    return s.store
  }
}

module.exports = UserListScene
