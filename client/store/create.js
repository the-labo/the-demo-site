/**
 * Create an new store
 * @function create
 * @returns {TheStore}
 */
'use strict'

const theStore = require('the-store')
const theScope = require('the-scope')

const scopes = require('./scopes')

/** @lends create */
module.exports = function create () {
  const store = theStore({
    // States to persists with localstorage
    persists: []
  })

  store.loadFromDefs(scopes, {
    types: {
      'OBJ': theScope.ObjectScope,
      'ARRY': theScope.ArrayScope,
      'BOOL': theScope.BooleanScope,
      'STR': theScope.StringScope,
      'VAL': theScope.ValueScope,
      'NUM': theScope.NumberScope
    }
  })

  return store
}
