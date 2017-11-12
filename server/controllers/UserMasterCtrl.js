/**
 * UserMasterCtrl
 * @class UserMasterCtrl
 */
'use strict'

const cn = require('./concerns')
const {TheCtrl} = require('the-controller-base')

/** @lends UserMasterCtrl */
const UserMasterCtrl = cn.compose(
)(
  class UserMasterCtrlBase extends TheCtrl {
    async fetchUserList ({filter, sort, page} = {}) {
      const s = this
      const {
        db: {
          resources: {User}
        }
      } = s.app
      return User.list({filter, sort, page})
    }

    async createUser ({name, role: roleCode, profile: profileAttributes}) {
      const s = this
      const {
        db: {
          resources: {User, Role, Sign, Profile}
        }
      } = s.app
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
      await s.onlyAdmin()

      const {
        db: {
          resources: {User, Sign}
        }
      } = s.app
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
      await s.onlyAdmin()

      const {app} = s
      const {User} = app.db.resources
      return User.destroyBulk(userIds)
    }
  }
)

module.exports = UserMasterCtrl
