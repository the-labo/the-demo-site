/**
 * ProfileEditScene
 * @class ProfileEditScene
 */
'use strict'

const Scene = require('./Scene')
const {clone} = require('asobj')
const cn = require('./concerns')

const ProfileEditSceneBase = cn.compose(
  cn.withBusy,
  cn.withEntry
)(Scene)

/** @lends ProfileEditScene */
class ProfileEditScene extends ProfileEditSceneBase {
  get scope () {
    return this.store.profileEdit
  }

  setEntryFromEntity (entity) {
    const values = clone(entity || {}, {
      without: ['user', 'id', 'sign', /^\$/]
    })
    this.setEntry(values)
  }

  async doSave () {
    const accountCtrl = await this.use('accountCtrl')
    await this.busyFor(async () => {
      await this.processEntry((values) => accountCtrl.updateProfile(values))
    })
  }
}

module.exports = ProfileEditScene
