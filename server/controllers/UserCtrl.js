/**
 * UserCtrl
 * @class UserCtrl
 */
'use strict'

const cn = require('./concerns')
const Ctrl = require('./Ctrl')

/** @lends UserCtrl */
const UserCtrl = cn.compose(
  cn.withAdmin
)(
  class UserCtrlBase extends Ctrl {
    async list ({filter, sort, page} = {}) {
      const s = this
      const {User} = s.resources
      return User.list({filter, sort, page})
    }

    async create ({name, role: roleCode, profile: profileAttributes}) {
      const s = this
      const {User, Role, Sign, Profile} = s.resources
      const role = await Role.ofCode(roleCode)
      const user = await User.create({name, role})
      user.password = await Sign.resetPasswordForUser(user)
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

    async resetPassword (...userIds) {
      const s = this
      await s._assertAsAdmin()
      const {User, Sign} = s.resources
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

    async destroy (...userIds) {
      const s = this
      await s._assertAsAdmin()

      const {app} = s
      const {User} = app.db.resources
      return User.destroyBulk(userIds)
    }
  }
)

module.exports = UserCtrl
