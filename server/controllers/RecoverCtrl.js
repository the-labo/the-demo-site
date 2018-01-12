/**
 * RecoverCtrl
 * @class RecoverCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const {compose, withDebug} = require('the-controller-mixins')
const {withAuth, withAlias} = require('./concerns')
const {Urls, Lifetimes} = require('@self/conf')

/** @lends RecoverCtrl */
const RecoverCtrl = compose(
  withAuth,
  withDebug,
  withAlias
)(
  class RecoverCtrlBase extends Ctrl {
    async send (email) {
      const {recoverService} = this.services
      const {mail, lang} = this
      const {envelop, expireAt, user} = await recoverService.processPrepare({
        email,
        expireIn: Lifetimes.RECOVER_EMAIL_LIFETIME
      })
      const seal = await this._sealFor(envelop)
      const url = await this._aliasUrlFor(Urls.RECOVER_RESET_URL, {envelop, seal, expireAt})
      this._debug(`Create recover url: ${url}`)
      await mail.sendRecover({lang, user, url, expireAt})
      return user
    }

    async reset ({seal: sealString, envelop, password} = {}) {
      const {recoverService} = this.services
      await this._assertSeal(sealString, envelop)
      const {user, sign} = await recoverService.processReset({envelop, password})
      await this._setAuthorized({user, sign})
      await this._reloadAuthorized()
      return this._fetchAuthorizedUser()
    }
  }
)

module.exports = RecoverCtrl