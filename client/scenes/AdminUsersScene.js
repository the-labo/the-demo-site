/**
 * AdminUsersScene
 * @class AdminUsersScene
 */
'use strict'

const Scene = require('./Scene')
const {expand} = require('objnest')
const {Urls, RoleCodes} = require('@self/conf')

/** @lends AdminUsersScene */
class AdminUsersScene extends Scene {

  setSearchValues (values) {
    const s = this
    const {store} = s
    const {users} = store.admin
    users.search.setValues(values)
  }

  updateCreatingValues (values) {
    const s = this
    const {store} = s
    const {users} = store.admin
    users.creating.entry.setValues(values)
  }

  async syncList ({pageNumber = 1, pageSize = 25, sort = '-createdAt'} = {}) {
    const s = this
    const {client, store} = s
    const {users} = store.admin
    const adminUsers = await s.use('adminUsers')

    const filter = {}
    sort = users.listing.resolveSort(sort)
    users.listing.sort.set(sort)

    const {state: searchValues = {}} = users.search.values
    const {q} = searchValues
    if (q) {
      filter.name = {$like: `%${String(q).trim()}%`}
    }
    users.listing.busy.true()
    try {
      let {meta, entities} = await adminUsers.fetchUserList({
        filter,
        page: {number: pageNumber, size: pageSize},
        sort: users.listing.sort.state || []
      })
      users.listing.entities.reset(entities)
      users.listing.meta.set(meta)
    } finally {
      users.listing.busy.false()
    }
  }

  async doCreate () {
    const s = this
    const {client, store, l} = s
    const {users} = store.admin
    const {info} = store.toast
    const adminUsersCtrl = await s.use('adminUsers')
    const values = expand(users.creating.entry.values.state)
    users.creating.busy.true()
    {
      let created
      try {
        created = await adminUsersCtrl.createUser(values)
      } catch (e) {
        users.creating.entry.setErrors(s.catchEntryError(e))
      } finally {
        users.creating.busy.false()
      }
      if (created) {
        info.push(l('toasts.USER_CREATE_DID_SUCCESS'))
        users.creating.created.set(created)
        users.creating.done.true()
      }
    }
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

module.exports = AdminUsersScene
