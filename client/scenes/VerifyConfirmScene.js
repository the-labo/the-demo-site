/**
 * VerifyConfirmScene
 * @class VerifyConfirmScene
 */
'use strict'

const Scene = require('./Scene')
const {bindScope, withBusy, withEntry, withFailure,} = require('the-scene-mixins/shim')

@withBusy
@withEntry
@withFailure
@bindScope('verifyConfirm')
class VerifyConfirmSceneBase extends Scene {}

/** @lends VerifyConfirmScene */
class VerifyConfirmScene extends VerifyConfirmSceneBase {
  @withBusy.while
  async doVerify () {
    const {l} = this
    const verifyCtrl = await this.use('verifyCtrl')
    await this.processEntry(async ({seal, envelop}) =>
      await verifyCtrl.verify({seal, envelop}).catch((e) =>
        this.catchFailure(e, {
          'ExpiredError': l('errors.VERIFY_EXPIRED_ERROR'),
          default: l('errors.VERIFY_FAILED_ERROR')
        })
      )
    )
  }
}

module.exports = VerifyConfirmScene
