/**
 * UserSearchScene
 * @class UserSearchScene
 */
'use strict'

const Scene = require('./Scene')
const { Urls } = require('@self/conf')

/** @lends UserSearchScene */
const UserSearchScene = class UserSearchSceneBase extends Scene {
  get scope () {
    const s = this
    return s.store
  }
}

module.exports = UserSearchScene
