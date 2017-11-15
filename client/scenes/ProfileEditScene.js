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
        const {profile} = await signCtrl.getCurrentUser()
        const values = clone(profile || {}, {
          without: ['user', 'id', 'sign', /^\$/]
        })
        s.setEntry(values)
      })
    }

    async doSave () {
      const s = this
      const accountCtrl = await s.use('accountCtrl')
      await s.busyFor(async () => {
        await s.processEntry((values) => accountCtrl.updateProfile(values))
      })
      s.toggle({done: true})
    }
  }
)

module.exports = ProfileEditScene
