/**
 * VerifyCtrl
 * @class VerifyCtrl
 */
'use strict'

const {Lifetimes, Urls,} = require('@self/conf')
const {compose,} = require('the-controller-mixins')
const {withAlias,} = require('./concerns')
const Ctrl = require('./Ctrl')

const VerifyCtrlBase = compose(
  withAlias,
)(Ctrl)

/** @lends VerifyCtrl */
class VerifyCtrl extends VerifyCtrlBase {

  async needsVerify () {
    const {
      services: {verifyService,},
      user,
    } = this
    if (!user) {
      return false
    }
    return verifyService.pickNeeded({userId: user.id,})
  }

  async send () {
    await this._assertAuthorized()

    const {
      lang,
      mail,
      services: {verifyService,},
      user,
    } = this
    const {envelop, expireAt,} = await verifyService.processPrepare({
      expireIn: Lifetimes.VERIFY_EMAIL_LIFETIME,
      userId: user.id,
    })

    const seal = await this._sealFor(envelop)
    const url = await this._aliasUrlFor(Urls.ACCOUNT_VERIFY_URL, {envelop, expireAt, seal,})
    this._debug(`Create verify url: ${url}`)
    await mail.sendVerify({expireAt, lang, url, user,})
  }

  async verify ({envelop, seal: sealString,} = {}) {
    const {
      services: {verifyService,},
    } = this
    await this._assertSeal(sealString, envelop)
    const {sign, user,} = await verifyService.processVerify({envelop,})
    await this._setAuthorized({sign, user,})
    await this._reloadAuthorized()
  }
}

module.exports = VerifyCtrl
