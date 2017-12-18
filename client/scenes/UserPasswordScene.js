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
)(
  class UserPasswordSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.userPassword
    }

    async doReset () {
      const s = this
      const userCtrl = await s.use('userCtrl')
      const userIds = s.get('targets').map(({id}) => String(id))
      await s.busyFor(async () => {
        const newPasswords = await userCtrl.resetPassword(...userIds)
        s.set({results: newPasswords})
      })
    }
  }
)

module.exports = UserPasswordScene
