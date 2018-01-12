/**
 * scopes
 * @module scopes
 */
'use strict'

const abstract = require('./abstract')
const account = require('./account')
const app = require('./app')
const cautionDisconnected = require('./cautionDisconnected')
const passwordChange = require('./passwordChange')
const profileEdit = require('./profileEdit')
const quit = require('./quit')
const recoverReset = require('./recoverReset')
const recoverSend = require('./recoverSend')
const signAsk = require('./signAsk')
const signIn = require('./signIn')
const signOut = require('./signOut')
const signUp = require('./signUp')
const toast = require('./toast')
const userCheck = require('./userCheck')
const userCreate = require('./userCreate')
const userDestroy = require('./userDestroy')
const userList = require('./userList')
const userPassword = require('./userPassword')
const userSearch = require('./userSearch')
const verifyConfirm = require('./verifyConfirm')
const verifyNeed = require('./verifyNeed')
const verifySend = require('./verifySend')

module.exports = {
  abstract,
  account,
  app,
  cautionDisconnected,
  passwordChange,
  profileEdit,
  quit,
  recoverReset,
  recoverSend,
  signAsk,
  signIn,
  signOut,
  signUp,
  toast,
  userCheck,
  userCreate,
  userDestroy,
  userList,
  userPassword,
  userSearch,
  verifyConfirm,
  verifyNeed,
  verifySend,
}
