/**
 * Create an new store
 * @function create
 * @returns {TheStore}
 */
'use strict'

const theStore = require('the-store').default
const {
  ObjectScope, ArrayScope, BooleanScope, StringScope, ValueScope, NumberScope,
} = require('the-scope/shim/scopes')

const scopes = require('./scopes')

/** @lends create */
module.exports = function create () {
  const store = theStore({
    // States to persists with localstorage
    persists: []
  })

  store.loadFromDefs(scopes, {
    types: {
      'OBJ': ObjectScope,
      'ARR': ArrayScope,
      'BOOL': BooleanScope,
      'STR': StringScope,
      'VAL': ValueScope,
      'NUM': NumberScope
    }
  })

  return store
}
