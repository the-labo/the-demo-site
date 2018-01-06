/**
 * VerifyCtrl
 * @class VerifyCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const cn = require('./concerns')
const {TheError, TheExpiredError, TheInvalidParameterError} = require('the-error')
const VerifySendError = TheError.withName('VerifySendError')
const {Urls, Lifetimes} = require('@self/conf')
const {now, dateAfter} = require('the-date')

/** @lends VerifyCtrl */
const VerifyCtrl = cn.compose(
  cn.withDebug,
  cn.withAuth
)(
  class VerifyCtrlBase extends Ctrl {

    async needsVerify () {
      const s = this
      const user = await s._fetchAuthorizedUser()
      if (!user) {
        return false
      }
      const {profile} = user
      return Boolean(profile && profile.isEmailVerifyNeeded)
    }

    async send () {
      const s = this
      const {mail} = s.app
      const {lang} = s.client
      await s._assertAuthorized()

      const user = await s._fetchAuthorizedUser()
      const {email} = user.profile || {}
      if (!email) {
        throw new VerifySendError(`Email is not registered`)
      }

      const expireAt = Number(dateAfter(Lifetimes.VERIFY_EMAIL_LIFETIME))
      const envelop = {expireAt, userId: user.id, email}

      const seal = await s._sealFor(envelop)
      const url = await s._aliasUrlFor(Urls.VERIFY_CONFIRM_URL, {envelop, seal, expireAt})
      s._debug(`Create verify url: ${url}`)
      await mail.sendVerify({lang, user, url, expireAt})

    }

    async verify ({seal: sealString, envelop} = {}) {
      const s = this
      const {User, Sign, Profile} = s.resources
      await s._assertSeal(sealString, envelop)

      const {expireAt, userId, email} = envelop
      const isExpired = new Date(Number(expireAt)) < now()
      if (isExpired) {
        throw new TheExpiredError('Verify expired')
      }
      await User.assertUserNotGone(userId)
      const user = await User.one(userId)
      const sign = await Sign.ofUser(user)
      await s._setAuthorized({user, sign})
      const profile = await Profile.ofUser(user)
      if (profile.email !== email) {
        throw new TheInvalidParameterError(`Invalid parameter`, envelop)
      }
      await profile.update({emailVerified: true})
      await s._reloadAuthorized()
      return s._fetchAuthorizedUser()
    }
  }
)

module.exports = VerifyCtrl