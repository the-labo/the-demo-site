/**
 * RecoverCtrl
 * @class RecoverCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const cn = require('./concerns')
const {Urls, Lifetimes} = require('@self/conf')
const {TheRecoverService} = require('the-site-services')

/** @lends RecoverCtrl */
const RecoverCtrl = cn.compose(
  cn.withAuth,
  cn.withDebug
)(
  class RecoverCtrlBase extends Ctrl {
    async send (email) {
      const s = this
      const {recoverService} = s.services
      const {mail, lang} = s
      const {envelop, expireAt, user} = await recoverService.processPrepare({
        email,
        expireIn: Lifetimes.RECOVER_EMAIL_LIFETIME
      })
      const seal = await s._sealFor(envelop)
      const url = await s._aliasUrlFor(Urls.RECOVER_RESET_URL, {envelop, seal, expireAt})
      s._debug(`Create recover url: ${url}`)
      await mail.sendRecover({lang, user, url, expireAt})
      return user
    }

    async reset ({seal: sealString, envelop, password} = {}) {
      const s = this
      const {recoverService} = s.services
      await s._assertSeal(sealString, envelop)

      const {user, sign} = await recoverService.processReset({envelop, password})
      await s._setAuthorized({user, sign})
      await s._reloadAuthorized()
      return s._fetchAuthorizedUser()
    }

    get services () {
      const s = this
      return {
        recoverService: new TheRecoverService(s.resources)
      }
    }
  }
)

module.exports = RecoverCtrl