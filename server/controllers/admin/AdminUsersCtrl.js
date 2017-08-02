/**
 * AdminUsersCtrl
 * @class AdminUsersCtrl
 */
'use strict'

const AdminCtrl = require('./AdminCtrl')
const {withDebug} = require('../concerns')

/** @lends AdminUsersCtrl */
class AdminUsersCtrl extends AdminCtrl {
  async fetchUserList ({filter, sort, page} = {}) {
    const s = this
    const {app} = s
    const {User} = app.db.resources
    return User.list({filter, sort, page})
  }

  async resetUserPasswords (userIds) {
    const s = this
    s._assertSigned()
    s._assertAsAdmin()
    const {app} = s
    const {User} = app.db.resources
    const newPasswords = {}
    for (const id of userIds) {
      const user = await User.one(id)
      if (!user) {
        continue
      }
      newPasswords[id] = await User.resetPassword(user)
    }
    return newPasswords
  }

  async destroyUsers (userIds) {
    const s = this
    s._assertSigned()
    s._assertAsAdmin()
    const {app} = s
    const {User} = app.db.resources
    return User.destroyBulk(userIds)
  }
}

module.exports = withDebug(
  AdminUsersCtrl, 'app:adminUsersCtrl'
)
