/**
 * UserPasswordScene
 * @class UserPasswordScene
 */
'use strict'

const Scene = require('./Scene')
const cn = require('./concerns')

const UserPasswordSceneBase = cn.compose(
  cn.withBusy,
)(Scene)

/** @lends UserPasswordScene */
class UserPasswordScene extends UserPasswordSceneBase {
  get scope () {
    return this.store.userPassword
  }

  async doReset () {
    const userCtrl = await this.use('userCtrl')
    const userIds = this.get('targets').map(({id}) => String(id))
    await this.busyFor(async () => {
      const newPasswords = await userCtrl.resetPassword(...userIds)
      this.set({results: newPasswords})
    })
  }
}

module.exports = UserPasswordScene
