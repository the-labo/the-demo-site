/**
 * UserPasswordScene
 * @class UserPasswordScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

/** @lends UserPasswordScene */
const UserPasswordScene = cn.compose(
  cn.withBusy,
  cn.withSet
)(
  class UserPasswordSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.user.password
    }

    prepare (targets) {
      const s = this
      s.set({
        active: true,
        done: false,
        targets
      })
    }

    clear () {
      const s = this
      s.set({
        active: false,
        done: false,
        targets: []
      })
    }
  }
)

module.exports = UserPasswordScene
