/**
 * ProfileEditScene
 * @class ProfileEditScene
 */
'use strict'

const Scene = require('./Scene')
const {clone} = require('asobj')
const cn = require('./concerns')

/** @lends ProfileEditScene */
const ProfileEditScene = cn.compose(
  cn.withEntry,
  cn.withBusy
)(
  class ProfileEditSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store.profile.edit
    }

    async doSync () {
      const s = this
      const authCtrl = await s.use('authCtrl')
      await s.busyFor(async () => {
        const user = await authCtrl.getCurrentUser()
        const values = clone(user.profile || {}, {
          without: ['user', 'id', 'sign', /^\$/]
        })
        s.setEntryValues(values)
      })
    }

    async doSave () {
      const s = this
      const authCtrl = await s.use('authCtrl')
      await s.busyFor(async () => {
        await s.processEntry((values) => authCtrl.updateProfile(values))
      })
    }
  }
)

module.exports = ProfileEditScene
