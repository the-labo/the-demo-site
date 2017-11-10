/**
 * Wrap controller with authorized
 * @function withAuthorized
 */
'use strict'

const {TheUnauthorizedError} = require('the-error')

/** @lends withAuthorized */
function withAuthorized (Class) {
  class WithAuthorized extends Class {
    async _getAuthorized () {
      const s = this
      const {session} = s
      return session.authorized || false
    }

    async _assertAuthorized () {
      const s = this
      const authorized = await s._getAuthorized()
      if (!authorized) {
        throw new TheUnauthorizedError('Needs Sign In')
      }
    }

    async _setAuthorized (user, sign) {
      const s = this
      const {session} = s
      session.authorized = {user, sign}
    }

    async _delAuthorized () {
      const s = this
      const {session} = s
      session.authorized = false
    }

    async _fetchAuthorizedUser () {
      const s = this
      const {session, app} = s
      const {User} = app.db.resources
      const {user} = (session.authorized || {})
      if (!user) {
        return null
      }
      return User.one(user.id)
    }

    async _reloadAuthorized () {
      const s = this
      const authorized = await s._getAuthorized()
      if (!authorized) {
        return
      }
      const {app, session} = s
      const {User, Sign} = app.db.resources
      const user = await User.one(authorized.user.id)
      if (user) {
        const sign = await Sign.ofUser(user)
        session.authorized = {user, sign}
      } else {
        session.authorized = false
      }
    }
  }

  return WithAuthorized
}

module.exports = withAuthorized
