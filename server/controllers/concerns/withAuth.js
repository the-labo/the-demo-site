/**
 * Wrap controller with authorized
 * @function withAuth
 */
'use strict'

const {withAuthorized} = require('the-controller-mixins')

/** @lends withAuth */
function withAuth (Class) {
  const WithAuthorized = withAuthorized(Class)

  class withAuth extends WithAuthorized {
    async _fetchAuthorizedUser () {
      const {
        resources: {User,},
      } = this
      const {user} = (await this._getAuthorized()) || {}
      if (!user) {
        return null
      }
      return User.one(user.id)
    }

    async _reloadAuthorized () {
      const {
        resources: {Sign,},
      } = this
      const user = await this._fetchAuthorizedUser()
      if (user) {
        const sign = await Sign.ofUser(user)
        await this._setAuthorized({user, sign})
      } else {
        await this._delAuthorized()
      }
    }

    async _verifyAuthorisedPassword (password) {
      const {
        resources: {Sign,},
      } = this
      const user = await this._fetchAuthorizedUser()
      const sign = await Sign.of(user)
      return sign.verifyPassword(password)
    }
  }

  return withAuth
}

module.exports = withAuth
