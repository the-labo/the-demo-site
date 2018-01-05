/**
 * VerifyCtrl
 * @class VerifyCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const cn = require('./concerns')
const {TheError, TheGoneError, TheExpiredError, TheInvalidParameterError} = require('the-error')
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
      return Boolean(profile && profile.isEmailVerifyNeeded())
    }

    async send () {
      const s = this
      const {mail, seal} = s.app
      const {lang} = s.client
      await s._assertAuthorized()

      const user = await s._fetchAuthorizedUser()
      const {email} = user.profile || {}
      if (!email) {
        throw new VerifySendError(`Email is not registered`)
      }

      const expireAt = Number(dateAfter(Lifetimes.VERIFY_EMAIL_LIFETIME))
      const envelop = {
        expireAt: String(expireAt),
        userId: user.id,
        email
      }
      const url = await s.aliasUrlFor(Urls.VERIFY_CONFIRM_URL, {
        envelop,
        seal: seal.seal(envelop),
        expireAt
      })
      s._debug(`Create verify url: ${url}`)
      await mail.sendVerify({
        lang,
        user,
        url,
        expireAt
      })

    }

    async verify ({seal: sealString, envelop} = {}) {
      const s = this
      const {seal} = s.app
      const {User, Sign, Profile} = s.resources
      const ok = seal.verify(sealString, envelop)
      if (!ok) {
        throw new TheInvalidParameterError(`Invalid parameter`, envelop)
      }
      const {expireAt, userId, email} = envelop
      const isExpired = new Date(Number(expireAt)) < now()
      if (isExpired) {
        throw new TheExpiredError('Verify expired')
      }
      const user = await User.one(userId)
      if (!user) {
        throw new TheGoneError('User already gone')
      }
      const sign = await Sign.ofUser(user)
      await s._setAuthorized(user, sign)
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