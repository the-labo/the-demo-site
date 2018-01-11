/**
 * SignUpScene
 * @class SignUpScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')
const {trimcase, lowercase} = require('stringcase')

/** @lends SignUpScene */
const SignUpScene = cn.compose(
  cn.withBusy,
  cn.withEntry,
  cn.withBack
)(
  class SignUpSceneBase extends Scene {
    get scope () {
      return this.store.signUp
    }

    async doSignUp () {
      const signCtrl = await this.use('signCtrl')
      await this.busyFor(async () =>
        await this.processEntry(({name, password, profile}) =>
          signCtrl.signUp(name, password, {profile})
        )
      )
    }
  }
)

module.exports = SignUpScene
