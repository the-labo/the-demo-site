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

  async createUser ({name, role: roleCode, profile: profileAttributes}) {
    const s = this
    const {app} = s
    const {User, Role, Sign, Profile} = app.db.resources
    const role = await Role.ofCode(roleCode)
    const user = await User.create({
      name, role
    })
    const password = await Sign.resetPasswordForUser(user)
    user.password = password
    try {
      const profile = await Profile.create(
        Object.assign(
          {},
          profileAttributes,
          {user}
        ), {errorNamespace: 'profile'})
      await user.update({profile})
    } catch (e) {
      await user.destroy()
      throw e
    }
    return user
  }

  async resetUserPasswords (userIds) {
    const s = this
    s._assertSigned()
    s._assertAsAdmin()
    const {app} = s
    const {User, Sign} = app.db.resources
    const newPasswords = {}
    for (const id of userIds) {
      const user = await User.one(id)
      if (!user) {
        continue
      }
      newPasswords[id] = await Sign.resetPasswordForUser(user)
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
