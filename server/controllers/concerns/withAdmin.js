/**
 * With admin
 * @function withAdmin
 */
'use strict'

const { TheForbiddenError } = require('the-error')
const { RoleCodes } = require('@self/conf')

/** @lends withAdmin */
function withAdmin (Class) {
  class WithAdmin extends Class {
    async controllerMethodWillInvoke (invocation) {
      await super.controllerMethodWillInvoke(invocation)
      await this._assertAsAdmin()
    }

    async _assertAsAdmin () {
      const isAdmin = await this._isAdmin()
      if (!isAdmin) {
        throw new TheForbiddenError('Needs to be an admin!')
      }
    }

    async _isAdmin () {
      const { user } = this
      return Boolean(user && user.hasRoleOf(RoleCodes.ADMIN_ROLE))
    }

    async _isConfirmedAsAdmin () {
      return this.session.confirmedAsAdmin
    }

    async _setConfirmedAsAdmin (confirmedAsAdmin) {
      this.session.confirmedAsAdmin = confirmedAsAdmin
    }
  }

  return WithAdmin
}

module.exports = withAdmin
