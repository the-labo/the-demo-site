/**
 * Create an new store
 * @function create
 * @returns {TheStore}
 */
'use strict'

const theStore = require('the-store')
const {
  ObjectScope,
  ValueScope,
  DetailingScope,
  CreatingScope,
  EdittingScope,
  EntryScope,
  DestroyingScope,
  ListingScope,
  ArrayScope,
  ToastScope,
  BooleanScope
} = require('the-scope')

/** @lends create */
module.exports = function create () {
  const store = theStore({
    // States to persists with localstorage
    persists: []
  })

  {
    const app = store.load(ObjectScope, 'app')
    app.load(BooleanScope, 'busy')
  }

  {
    const sign = store.load(ObjectScope, 'sign')

    sign.load(CreatingScope, 'signup')
    sign.load(CreatingScope, 'signin')
    sign.load(DestroyingScope, 'signout')
    sign.load(DestroyingScope, 'signdel')
    sign.load(BooleanScope, 'resetting')

    {
      const singed = sign.load(ObjectScope, 'signed')
      singed.load(ValueScope, 'user')
      singed.load(BooleanScope, 'busy')
      singed.load(BooleanScope, 'synced')
    }
  }

  {
    const account = store.load(ObjectScope, 'account')
    account.load(EdittingScope, 'profile')
    account.load(EdittingScope, 'password')
  }

  store.load(ToastScope, 'toast')

  {
    const admin = store.load(ObjectScope, 'admin')
    {
      const users = admin.load(ObjectScope, 'users')

      {
        const passwordReset = users.load(ObjectScope, 'passwordReset')
        passwordReset.load(BooleanScope, 'busy')
        passwordReset.load(BooleanScope, 'confirming')
        passwordReset.load(BooleanScope, 'resulting')
        passwordReset.load(ObjectScope, 'newPasswords')
      }
      {
        const destroying = users.load(ObjectScope, 'destroying')
        destroying.load(BooleanScope, 'busy')
        destroying.load(BooleanScope, 'confirming')
      }
      users.load(ListingScope, 'listing')
      users.load(CreatingScope, 'creating')
      users.load(EntryScope, 'search')
      users.load(BooleanScope, 'creating', 'active')
      users.load(ValueScope, 'creating', 'created')
    }
  }

  return store
}
