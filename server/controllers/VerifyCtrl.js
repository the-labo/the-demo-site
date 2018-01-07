/**
 * VerifyCtrl
 * @class VerifyCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const cn = require('./concerns')
const {TheVerifyService} = require('the-site-services')
const {Urls, Lifetimes} = require('@self/conf')

/** @lends VerifyCtrl */
const VerifyCtrl = cn.compose(
  cn.withDebug,
  cn.withAuth
)(
  class VerifyCtrlBase extends Ctrl {

    async needsVerify () {
      const s = this
      const {verifyService} = s.services
      const user = await s._fetchAuthorizedUser()
      if (!user) {
        return false
      }
      return verifyService.pickNeeded({userId: user.id})
    }

    async send () {
      const s = this
      const {verifyService} = s.services
      const {mail, lang} = s
      await s._assertAuthorized()
      const user = await s._fetchAuthorizedUser()

      const {envelop, expireAt} = await verifyService.processPrepare({
        userId: user.id,
        expireIn: Lifetimes.VERIFY_EMAIL_LIFETIME
      })

      const seal = await s._sealFor(envelop)
      const url = await s._aliasUrlFor(Urls.VERIFY_CONFIRM_URL, {envelop, seal, expireAt})
      s._debug(`Create verify url: ${url}`)

      await mail.sendVerify({lang, user, url, expireAt})

    }

    async verify ({seal: sealString, envelop} = {}) {
      const s = this
      const {verifyService} = s.services
      await s._assertSeal(sealString, envelop)

      const {sign, user} = await verifyService.processVerify({envelop})
      await s._setAuthorized({user, sign})
      await s._reloadAuthorized()
      return s._fetchAuthorizedUser()
    }

    get services () {
      const s = this
      return {
        verifyService: new TheVerifyService(s.resources)
      }
    }
  }
)

module.exports = VerifyCtrl