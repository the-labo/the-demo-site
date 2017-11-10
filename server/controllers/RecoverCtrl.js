/**
 * RecoverCtrl
 * @class RecoverCtrl
 */
'use strict'

const {TheCtrl} = require('the-controller-base')
const {withDebug, withAuthorized} = require('./concerns')
const {TheError, TheGoneError, TheExpiredError, TheInvalidParameterError} = require('the-error')
const UnknownEmailError = TheError.withName('UnknownEmailError')
const {Urls, Lifetimes} = require('@self/conf')
const {now, dateAfter} = require('the-date')
const qs = require('qs')

/** @lends RecoverCtrl */
class RecoverCtrl extends TheCtrl {
  async send (email) {
    const s = this
    const {app, client} = s
    const {db, mail, seal} = app
    const {Profile, Alias} = db.resources
    const {protocol, host, lang} = client

    const profile = await Profile.first({email})
    if (!profile) {
      throw UnknownEmailError(`Unknown email: ${email}`)
    }
    const {user} = profile
    const expireAt = Number(dateAfter(Lifetimes.RECOVER_EMAIL_LIFETIME))
    const envelop = {
      expireAt,
      userId: user.id,
    }
    const sealString = seal.seal(envelop)
    const query = qs.stringify({envelop, seal: sealString, expireAt})
    const url = `${protocol}//${host}${Urls.RECOVER_RESET_URL}?${query}`
    const alias = await Alias.ofUrl(url)
    s._debug(`Create recover url: ${url}`)
    await mail.sendRecover({
      lang,
      user,
      url: alias.shortUrl,
      expireAt
    })
    return user
  }

  async reset ({seal: sealString, envelop, password} = {}) {
    const s = this
    const {app, client} = s
    const {db, seal} = app
    const {User, Sign, Profile} = db.resources
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

module.exports = withAuthorized(
  withDebug(
    RecoverCtrl
  )
)
