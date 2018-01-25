/**
 * VerifyCtrl
 * @class VerifyCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const {Urls, Lifetimes} = require('@self/conf')
const {compose,} = require('the-controller-mixins')
const {withAlias,} = require('./concerns')

const VerifyCtrlBase = compose(
  withAlias,
)(Ctrl)

/** @lends VerifyCtrl */
class VerifyCtrl extends VerifyCtrlBase {

  async needsVerify () {
    const {
      user,
      services: {verifyService},
    } = this
    if (!user) {
      return false
    }
    return verifyService.pickNeeded({userId: user.id})
  }

  async send () {
    await this._assertAuthorized()

    const {
      mail,
      lang,
      user,
      services: {verifyService},
    } = this
    const {envelop, expireAt} = await verifyService.processPrepare({
      userId: user.id,
      expireIn: Lifetimes.VERIFY_EMAIL_LIFETIME
    })

    const seal = await this._sealFor(envelop)
    const url = await this._aliasUrlFor(Urls.ACCOUNT_VERIFY_URL, {envelop, seal, expireAt})
    this._debug(`Create verify url: ${url}`)
    await mail.sendVerify({lang, user, url, expireAt})
  }

  async verify ({seal: sealString, envelop} = {}) {
    const {
      services: {verifyService},
    } = this
    await this._assertSeal(sealString, envelop)
    const {sign, user} = await verifyService.processVerify({envelop})
    await this._setAuthorized({user, sign})
    await this._reloadAuthorized()
  }
}

module.exports = VerifyCtrl