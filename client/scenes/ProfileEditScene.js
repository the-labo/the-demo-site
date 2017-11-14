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
      const signCtrl = await s.use('signCtrl')
      await s.busyFor(async () => {
        const user = await signCtrl.getCurrentUser()
        const values = clone(user.profile || {}, {
          without: ['user', 'id', 'sign', /^\$/]
        })
        s.setEntryValues(values)
      })
    }

    async doSave () {
      const s = this
      const signCtrl = await s.use('signCtrl')
      await s.busyFor(async () => {
        await s.processEntry((values) => signCtrl.updateProfile(values))
      })
      s.toggle({done: true})
    }
  }
)

module.exports = ProfileEditScene
