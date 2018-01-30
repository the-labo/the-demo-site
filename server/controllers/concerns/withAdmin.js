/**
 * With admin
 * @function withAdmin
 */
'use strict'

const {RoleCodes,} = require('@self/conf')
const {TheForbiddenError,} = require('the-error')

/** @lends withAdmin */
function withAdmin (Class) {
  class WithAdmin extends Class {
    async _isAdmin () {
      const {user,} = this
      return Boolean(user && user.hasRoleOf(RoleCodes.ADMIN_ROLE))
    }

    async _assertAsAdmin () {
      const isAdmin = await this._isAdmin()
      if (!isAdmin) {
        throw new TheForbiddenError('Needs to be an admin!')
      }
    }

    async _setConfirmedAsAdmin (confirmedAsAdmin) {
      this.session.confirmedAsAdmin = confirmedAsAdmin
    }

    async _isConfirmedAsAdmin () {
      return this.session.confirmedAsAdmin
    }
  }

  return WithAdmin
}

module.exports = withAdmin
