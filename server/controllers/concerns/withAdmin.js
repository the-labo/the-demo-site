/**
 * With admin
 * @function withAdmin
 */
'use strict'

const {TheForbiddenError} = require('the-error')
const {RoleCodes} = require('@self/conf')

/** @lends withAdmin */
function withAdmin (Class) {
  class WithAdmin extends Class {
    async _isAdmin () {
      const s = this
      const {session} = s
      const {user} = session.authorized || {}
      const {role} = user || {}
      return role && role.code === RoleCodes.ADMIN_ROLE
    }

    async _assertAsAdmin () {
      const s = this
      const isAdmin = await s._isAdmin()
      if (!isAdmin) {
        throw new TheForbiddenError('Needs to be an admin!')
      }
    }

    async _setConfirmedAsAdmin (confirmedAsAdmin) {
      const s = this
      const {session} = s
      session.confirmedAsAdmin = confirmedAsAdmin
    }

    async _isConfirmedAsAdmin () {
      const s = this
      const {session} = s
      return session.confirmedAsAdmin
    }
  }

  return WithAdmin
}

module.exports = withAdmin
