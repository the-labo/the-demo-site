/**
 * VerifyCtrl
 * @class VerifyCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const {Urls, Lifetimes} = require('@self/conf')
const {compose, withDebug} = require('the-controller-mixins')
const {withAuth, withAlias,} = require('./concerns')

/** @lends VerifyCtrl */
const VerifyCtrl = compose(
  withDebug,
  withAuth,
  withAlias
)(
  class VerifyCtrlBase extends Ctrl {

    async needsVerify () {
      const {verifyService} = this.services
      const user = await this._fetchAuthorizedUser()
      if (!user) {
        return false
      }
      return verifyService.pickNeeded({userId: user.id})
    }

    async send () {
      const {verifyService} = this.services
      const {mail, lang} = this
      await this._assertAuthorized()
      const user = await this._fetchAuthorizedUser()

      const {envelop, expireAt} = await verifyService.processPrepare({
        userId: user.id,
        expireIn: Lifetimes.VERIFY_EMAIL_LIFETIME
      })

      const seal = await this._sealFor(envelop)
      const url = await this._aliasUrlFor(Urls.VERIFY_CONFIRM_URL, {envelop, seal, expireAt})
      this._debug(`Create verify url: ${url}`)
      await mail.sendVerify({lang, user, url, expireAt})
    }

    async verify ({seal: sealString, envelop} = {}) {
      const {verifyService} = this.services
      await this._assertSeal(sealString, envelop)
      const {sign, user} = await verifyService.processVerify({envelop})
      await this._setAuthorized({user, sign})
      await this._reloadAuthorized()
      return this._fetchAuthorizedUser()
    }
  }
)

module.exports = VerifyCtrl