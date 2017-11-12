/**
 * UserCreateScene
 * @class UserCreateScene
 */
'use strict'

const Scene = require('./Scene')
const { Urls } = require('@self/conf')

/** @lends UserCreateScene */
const UserCreateScene = class UserCreateSceneBase extends Scene {
  get scope () {
    const s = this
    return s.store
  }
}

module.exports = UserCreateScene
