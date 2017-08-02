/**
 * Wrap controller with sign
 * @function withSigned
 */
'use strict'

const {TheUnauthorizedError} = require('the-error')

/** @lends withSigned */
function withSigned (Class) {
  class WithSigned extends Class {
    _getSigned () {
      const s = this
      const {session} = s
      return session.signed || false
    }

    _assertSigned () {
      const s = this
      const signed = s._getSigned()
      if (!signed) {
        throw new TheUnauthorizedError('Needs Sign In')
      }
    }

    _setSigned (user, sign) {
      const s = this
      const {session} = s
      session.signed = {user, sign}
    }

    _delSigned () {
      const s = this
      const {session} = s
      session.signed = false
    }

    async _fetchSignedUser () {
      const s = this
      const {session, app} = s
      const {User} = app.db.resources
      let {user} = (session.signed || {})
      if (!user) {
        return null
      }
      return User.one(user.id)
    }

    async _reloadSigned () {
      const s = this
      const signed = await s._getSigned()
      if (!signed) {
        return
      }
      const {app, session} = s
      const {User, Sign} = app.db.resources
      const user = await User.one(signed.user.id)
      if (user) {
        const sign = await Sign.ofUser(user)
        session.signed = {user, sign}
      } else {
        session.signed = false
      }
    }
  }

  return WithSigned
}

module.exports = withSigned
