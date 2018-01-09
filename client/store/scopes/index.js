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
  verifySend
}

exports.abstract = abstract
exports.account = account
exports.app = app
exports.cautionDisconnected = cautionDisconnected
exports.passwordChange = passwordChange
exports.profileEdit = profileEdit
exports.quit = quit
exports.recoverReset = recoverReset
exports.recoverSend = recoverSend
exports.signAsk = signAsk
exports.signIn = signIn
exports.signOut = signOut
exports.signUp = signUp
exports.toast = toast
exports.userCheck = userCheck
exports.userCreate = userCreate
exports.userDestroy = userDestroy
exports.userList = userList
exports.userPassword = userPassword
exports.userSearch = userSearch
exports.verifyConfirm = verifyConfirm
exports.verifyNeed = verifyNeed
exports.verifySend = verifySend
