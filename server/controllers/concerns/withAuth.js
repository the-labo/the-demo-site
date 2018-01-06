/**
 * Wrap controller with authorized
 * @function withAuth
 */
'use strict'

const {withAuthorized} = require('the-controller-base/mixins')

/** @lends withAuth */
function withAuth (Class) {
  const WithAuthorized = withAuthorized(Class)

  class withAuth extends WithAuthorized {
    async _fetchAuthorizedUser () {
      const s = this
      const {User} = s.resources
      const {user} = (await s._getAuthorized()) || {}
      if (!user) {
        return null
      }
      return User.one(user.id)
    }

    async _reloadAuthorized () {
      const s = this
      const {Sign} = s.resources
      const user = await s._fetchAuthorizedUser()
      if (user) {
        const sign = await Sign.ofUser(user)
        await s._setAuthorized({user, sign})
      } else {
        await s._delAuthorized()
      }
    }
  }

  return withAuth
}

module.exports = withAuth
