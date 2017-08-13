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
    _isAdmin () {
      const s = this
      const {session} = s
      const {user} = session.signed || {}
      const {role} = user || {}
      return role && role.code === RoleCodes.ADMIN_ROLE
    }

    _assertAsAdmin () {
      const s = this
      const isAdmin = s._isAdmin()
      if (!isAdmin) {
        throw new TheForbiddenError('Needs to be an admin!')
      }
    }

    _setConfirmedAsAdmin (confirmedAsAdmin) {
      const s = this
      const {session} = s
      session.confirmedAsAdmin = confirmedAsAdmin
    }

    _isConfirmedAsAdmin () {
      const s = this
      const {session} = s
      return session.confirmedAsAdmin
    }
  }

  return WithAdmin
}

module.exports = withAdmin
