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
  return theStore({
    // States to persists on local storage
    persists: [],
    scopes,
    types: {
      'OBJ': ObjectScope,
      'ARR': ArrayScope,
      'BOOL': BooleanScope,
      'STR': StringScope,
      'VAL': ValueScope,
      'NUM': NumberScope
    }
  })
}
