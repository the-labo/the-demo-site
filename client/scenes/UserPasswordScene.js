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
      return s.store.user.password
    }


    async doReset () {
      const s = this
      const userCtrl = await s.use('userCtrl')
      const userIds = s.scope.targets.state.map(({id}) => String(id))
      await s.busyFor(async () => {
        await userCtrl.resetPassword(userIds)
      })
    }
  }
)

module.exports = UserPasswordScene
