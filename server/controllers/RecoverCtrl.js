/**
 * RecoverCtrl
 * @class RecoverCtrl
 */
'use strict'

const Ctrl = require('./Ctrl')
const cn = require('./concerns')
const {TheError, TheGoneError, TheExpiredError, TheInvalidParameterError} = require('the-error')
const UnknownEmailError = TheError.withName('UnknownEmailError')
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
      const {mail, seal} = s.app
      const {Profile} = s.resources
      const {lang} = s.client

      const profile = await Profile.first({email})
      if (!profile) {
        throw new UnknownEmailError(`Unknown email: ${email}`)
      }
      const {user} = profile
      const expireAt = Number(dateAfter(Lifetimes.RECOVER_EMAIL_LIFETIME))
      const envelop = {
        expireAt,
        userId: user.id,
      }
      const url = await s.aliasUrlFor(Urls.RECOVER_RESET_URL, {
        envelop,
        seal: seal.seal(envelop),
        expireAt
      })
      s._debug(`Create recover url: ${url}`)
      await mail.sendRecover({
        lang,
        user,
        url,
        expireAt
      })
      return user
    }

    async reset ({seal: sealString, envelop, password} = {}) {
      const s = this
      const {seal} = s.app
      const {User, Sign} = s.resources
      const ok = seal.verify(sealString, envelop)
      if (!ok) {
        throw new TheInvalidParameterError(`Invalid parameter`, envelop)
      }
      const {expireAt, userId} = envelop
      const isExpired = new Date(Number(expireAt)) < now()
      if (isExpired) {
        throw new TheExpiredError('Recovery expired')
      }
      const user = await User.one(userId)
      if (!user) {
        throw new TheGoneError('User already gone')
      }
      await Sign.setUserPassword(user, password)

      const sign = await Sign.ofUser(user)
      await s._setAuthorized(user, sign)
      await s._reloadAuthorized()
      return s._fetchAuthorizedUser()
    }
  }
)
module.exports = RecoverCtrl