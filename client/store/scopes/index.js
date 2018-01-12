/**
 * scopes
 * @module scopes
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const abstract = _d(require('./abstract'))
const account = _d(require('./account'))
const app = _d(require('./app'))
const cautionDisconnected = _d(require('./cautionDisconnected'))
const passwordChange = _d(require('./passwordChange'))
const profileEdit = _d(require('./profileEdit'))
const quit = _d(require('./quit'))
const recoverReset = _d(require('./recoverReset'))
const recoverSend = _d(require('./recoverSend'))
const signAsk = _d(require('./signAsk'))
const signIn = _d(require('./signIn'))
const signOut = _d(require('./signOut'))
const signUp = _d(require('./signUp'))
const toast = _d(require('./toast'))
const userCheck = _d(require('./userCheck'))
const userCreate = _d(require('./userCreate'))
const userDestroy = _d(require('./userDestroy'))
const userList = _d(require('./userList'))
const userPassword = _d(require('./userPassword'))
const userSearch = _d(require('./userSearch'))
const verifyConfirm = _d(require('./verifyConfirm'))
const verifyNeed = _d(require('./verifyNeed'))
const verifySend = _d(require('./verifySend'))

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
