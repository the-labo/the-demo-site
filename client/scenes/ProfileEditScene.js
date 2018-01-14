/**
 * ProfileEditScene
 * @class ProfileEditScene
 */
'use strict'

const Scene = require('./Scene')
const {clone} = require('asobj')
const {forScope, withBusy, withEntry} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@forScope('profileEdit')
class ProfileEditSceneBase extends Scene {}

/** @lends ProfileEditScene */
class ProfileEditScene extends ProfileEditSceneBase {

  setEntryFromEntity (entity) {
    const values = clone(entity || {}, {
      without: ['user', 'id', 'sign', /^\$/]
    })
    this.setEntry(values)
  }

  @withBusy.while
  async doSave () {
    const accountCtrl = await this.use('accountCtrl')
    await this.processEntry((values) => accountCtrl.updateProfile(values))
  }
}

module.exports = ProfileEditScene
