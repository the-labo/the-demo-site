/**
 * VerifyCtrl
 * @class VerifyCtrl
 */
'use strict'

const {TheCtrl} = require('the-controller-base')
const {withDebug, withSigned} = require('./concerns')
const {TheError, TheGoneError, TheExpiredError, TheInvalidParameterError} = require('the-error')
const VerifySendError = TheError.withName('VerifySendError')
const {Urls, Lifetimes} = require('@self/conf')
const {now, dateAfter} = require('the-date')
const qs = require('qs')

/** @lends VerifyCtrl */
class VerifyCtrl extends TheCtrl {

  async needsVerify () {
    const s = this
    const user = await s._fetchSignedUser()
    if (!user) {
      return false
    }
    const {profile} = user
    return profile && profile.email && !profile.emailVerified
  }

  async send () {
    const s = this
    const {app, client} = s
    const {db, mail, seal} = app
    const {Alias} = db.resources
    const {protocol, host, lang} = client
    s._assertSigned()

    const user = await s._fetchSignedUser()
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
    const sealString = seal.seal(envelop)
    const query = qs.stringify({envelop, seal: sealString, expireAt})
    const url = `${protocol}//${host}${Urls.VERIFY_CONFIRM_URL}?${query}`
    const alias = await Alias.ofUrl(url)
    s._debug(`Create verify url: ${url}`)

    await mail.sendVerify({
      lang,
      user,
      url: alias.shortUrl,
      expireAt
    })

  }

  async verify ({seal: sealString, envelop} = {}) {
    const s = this
    const {app} = s
    const {seal, db} = app
    const {User, Sign, Profile} = db.resources
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
    s._setSigned(user, sign)
    const profile = await Profile.ofUser(user)
    if (profile.email !== email) {
      throw new TheInvalidParameterError(`Invalid parameter`, envelop)
    }
    profile.update({emailVerified: true})
    await s._reloadSigned()
    return s._fetchSignedUser()
  }
}

module.exports = withSigned(
  withDebug(
    VerifyCtrl
  )
)
