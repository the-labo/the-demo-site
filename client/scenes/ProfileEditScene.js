/**
 * ProfileEditScene
 * @class ProfileEditScene
 */
'use strict'

const Scene = require('./Scene')
const {clone} = require('asobj')
const {compose, withBusy, withEntry} =  require('the-scene-mixins/shim')

const ProfileEditSceneBase = compose(
  withBusy,
  withEntry
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
