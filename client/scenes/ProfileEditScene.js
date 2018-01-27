/**
 * ProfileEditScene
 * @class ProfileEditScene
 */
'use strict'

const Scene = require('./Scene')
const {clone} = require('asobj')
const {bindScope, withBusy, withEntry} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@bindScope('profile.edit')
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
    const {accountCtrl} = this.controllers
    await this.processEntry((values) => accountCtrl.updateProfile(values))
  }
}

module.exports = ProfileEditScene
