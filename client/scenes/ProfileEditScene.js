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
  cn.withBusy,
  cn.withEntry
)(
  class ProfileEditSceneBase extends Scene {
    get scope () {
      const s = this
      return s.store['profileEdit']
    }

    async doSync () {
      const s = this
      const accountCtrl = await s.use('accountCtrl')
      await s.busyFor(async () => {
        const {profile} = await accountCtrl.getCurrentUser()
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
    }
  }
)

module.exports = ProfileEditScene
