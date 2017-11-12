/**
 * SignoutScene
 * @class SignoutScene
 */
'use strict'

const Scene = require('./Scene')
const {Urls} = require('@self/conf')

/** @lends SignoutScene */
class SignoutScene extends Scene {
  get scope () {
    const s = this
    return s.store.auth.signout
  }

  async doSignout () {
    const s = this
    const authCtrl = await s.use('authCtrl')
    await s.busyFor(async () => {
      await authCtrl.signout()
    })
  }

}

module.exports = SignoutScene
