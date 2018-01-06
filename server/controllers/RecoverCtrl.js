/**
 * RecoverCtrl
 * @class RecoverCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const cn = require('./concerns')
const {TheExpiredError} = require('the-error')
const {Urls, Lifetimes} = require('@self/conf')
const {now, dateAfter} = require('the-date')

/** @lends RecoverCtrl */
const RecoverCtrl = cn.compose(
  cn.withAuth,
  cn.withDebug
)(
  class RecoverCtrlBase extends Ctrl {
    async send (email) {
      const s = this
      const {mail} = s.app
      const {Profile} = s.resources
      const {lang} = s.client

      await Profile.assertEmailExists(email)
      const user = await Profile.userWithEmail(email)
      const expireAt = Number(dateAfter(Lifetimes.RECOVER_EMAIL_LIFETIME))
      const envelop = {expireAt, userId: user.id,}
      const seal = await s._sealFor(envelop)
      const url = await s._aliasUrlFor(Urls.RECOVER_RESET_URL, {envelop, seal, expireAt})
      s._debug(`Create recover url: ${url}`)
      await mail.sendRecover({lang, user, url, expireAt})
      return user
    }

    async reset ({seal: sealString, envelop, password} = {}) {
      const s = this
      const {User, Sign} = s.resources
      await s._assertSeal(sealString, envelop)

      const {expireAt, userId} = envelop
      const isExpired = new Date(Number(expireAt)) < now()
      if (isExpired) {
        throw new TheExpiredError('Recovery expired')
      }
      await User.assertUserNotGone(userId)

      const user = await User.one(userId)
      await Sign.setUserPassword(user, password)

      const sign = await Sign.ofUser(user)
      await s._setAuthorized({user, sign})
      await s._reloadAuthorized()
      return s._fetchAuthorizedUser()
    }
  }
)

module.exports = RecoverCtrl