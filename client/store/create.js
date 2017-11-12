/**
 * Create an new store
 * @function create
 * @returns {TheStore}
 */
'use strict'

const theStore = require('the-store')
const theScope = require('the-scope')

const scopes = require('./scopes.json')

/** @lends create */
module.exports = function create () {
  const store = theStore({
    // States to persists with localstorage
    persists: []
  })

  store.loadFromDefs(scopes, {
    types: {
      'ARR': theScope.ArrayScope,
      'BOOL': theScope.BooleanScope,
      'STR': theScope.StringScope,
      'VAL': theScope.ValueScope,
      'NUM': theScope.NumberScope
    }
  })

  {
    const app = store.load(ObjectScope, 'app')
    app.load(BooleanScope, 'busy')
  }

  {
    const signin = store.load(ObjectScope, 'signin')
    signin.load(ValueScope, 'back')
    signin.load(EntryScope, 'entry')
    signin.load(BooleanScope, 'busy')
  }
  {
    const signup = store.load(ObjectScope, 'signup')
    signup.load(ValueScope, 'back')
    signup.load(EntryScope, 'entry')
    signup.load(BooleanScope, 'busy')
  }
  {
    const signout = store.load(ObjectScope, 'signout')
    signout.load(BooleanScope, 'busy')
  }
  {
    const signask = auth.load(ObjectScope, 'signask')
    signask.load(BooleanScope, 'busy')
  }

  {
    const auth = store.load(ObjectScope, 'auth')
    {
      const user = auth.load(ValueScope, 'user')
      user.load(BooleanScope, 'synced')
    }

    {
      const signdel = auth.load(ObjectScope, 'signdel')
      signdel.load(BooleanScope, 'busy')
      signdel.load(BooleanScope, 'done')
      signdel.load(BooleanScope, 'confirming')
    }
    {
      const profile = auth.load(ObjectScope, 'profile')
      profile.load(BooleanScope, 'busy')
      profile.load(EntryScope, 'entry')
    }
    {
      const password = auth.load(ObjectScope, 'password')
      password.load(BooleanScope, 'busy')
      password.load(EntryScope, 'entry')
    }
    {
      const verify = auth.load(ObjectScope, 'verify')
      verify.load(BooleanScope, 'busy')
      verify.load(BooleanScope, 'done')
      verify.load(ValueScope, 'errorMessage')
      verify.load(BooleanScope, 'needsVerify')
    }
    {
      const recover = auth.load(ObjectScope, 'recover')
      recover.load(CreatingScope, 'send')
      recover.load(ValueScope, 'send', 'errorMessage')
      recover.load(EdittingScope, 'reset')
      recover.load(ValueScope, 'reset', 'errorMessage')
    }
  }

  store.load(ToastScope, 'toast')

  {
    const master = store.load(ObjectScope, 'master')
    {
      const users = master.load(ObjectScope, 'users')

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
