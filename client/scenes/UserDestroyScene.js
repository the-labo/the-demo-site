/**
 * UserDestroyScene
 * @class UserDestroyScene
 */
'use strict'

const Scene = require('./Scene')
const { Urls } = require('@self/conf')

/** @lends UserDestroyScene */
const UserDestroyScene = class UserDestroySceneBase extends Scene {
  get scope () {
    const s = this
    return s.store
  }
}

module.exports = UserDestroyScene
