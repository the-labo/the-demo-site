/**
 * UserMasterScene
 * @class UserMasterScene
 */
'use strict'

const Scene = require('./Scene')
const {expand} = require('objnest')
const {Urls, RoleCodes} = require('@self/conf')

/** @lends UserMasterScene */
class UserMasterScene extends Scene {

  get scope () {
    const s = this
    return s.store.master.users
  }

  updateChecks (values) {
    const s = this
    const {store} = s
    const {users} = store.admin
    users.listing.checks.set(values)
  }

  removeChecks () {
    const s = this
    const {store} = s
    const {users} = store.admin
    users.listing.checks.drop()
  }

  toggleCreatingActive (active) {
    const s = this
    const {store} = s
    const {users} = store.admin
    users.creating.active.toggle(active)
  }

  toggleCreatingDone (done) {
    const s = this
    const {store} = s
    const {users} = store.admin
    users.creating.done.toggle(done)
  }

  startCreating () {
    const s = this
    s.updateCreatingValues({
      name: '',
      role: RoleCodes.NORMAL_ROLE
    })
    s.toggleCreatingActive(true)
  }

  toggleDestroyConfirming (destroyConfirming) {
    const s = this
    const {store} = s
    const {users} = store.admin
    users.destroying.confirming.toggle(destroyConfirming)
  }

  togglePasswordResetConfirming (passwordResetting) {
    const s = this
    const {store} = s
    const {users} = store.admin
    users.passwordReset.confirming.toggle(passwordResetting)
  }

  togglePasswordResetResulting (passwordResulting) {
    const s = this
    const {store} = s
    const {users} = store.admin
    users.passwordReset.resulting.toggle(passwordResulting)
  }

  async doDestroy (ids) {
    const s = this
    const {client, store, l} = s
    const {users} = store.admin
    const {info} = store.toast
    const adminUsers = await s.use('adminUsers')

    users.destroying.busy.true()
    let destroyed
    try {
      destroyed = await adminUsers.destroyUsers(ids)
    } finally {
      users.destroying.busy.false()
    }
    if (destroyed) {
      info.push(l('toasts.USER_DESTROY_DID_SUCCESS'))
      s.toggleDestroyConfirming(false)
      await s.syncList()
    }
  }

  async doPasswordReset (ids) {
    const s = this
    s.dropNewPasswords()
    const {client, store} = s
    const {users} = store.admin
    const adminUsers = await s.use('adminUsers')
    {
      users.passwordReset.busy.true()

      let passwords
      try {
        passwords = await adminUsers.resetUserPasswords(ids)
      } finally {
        users.passwordReset.busy.false()
      }
      if (passwords) {
        users.passwordReset.passwords.set(passwords)
        s.togglePasswordResetConfirming(false)
        s.togglePasswordResetResulting(true)
      }
    }
  }

  dropNewPasswords () {
    const s = this
    const {store} = s
    const {users} = store.admin
    users.passwordReset.passwords.drop()
  }
}

module.exports = UserMasterScene
