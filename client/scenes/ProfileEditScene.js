/**
 * ProfileEditScene
 * @class ProfileEditScene
 */
'use strict'

const {bindScope} = require('the-scene-mixins/shim')
const InputScene = require('./abstract/InputScene')

@bindScope('profile.edit')
class ProfileEditSceneBase extends InputScene {}

/** @lends ProfileEditScene */
class ProfileEditScene extends ProfileEditSceneBase {

  async detailWith (values) {
    const {accountCtrl} = this.controllers
    return await accountCtrl.updateProfile(values)
  }

  static entitySkipFields = ['user', 'id', 'sign', /^\$/]
}

module.exports = ProfileEditScene
