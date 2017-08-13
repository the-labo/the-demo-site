/**
 * Scene classes
 * @module scenes
 */
'use strict'

const AccountScene = require('./AccountScene')
const AdminUsersScene = require('./AdminUsersScene')
const HomeScene = require('./HomeScene')
const RecoverScene = require('./RecoverScene')
const Scene = require('./Scene')
const SignScene = require('./SignScene')
const VerifyScene = require('./VerifyScene')
const mixins = require('./mixins')

module.exports = {
  AccountScene,
  AdminUsersScene,
  HomeScene,
  RecoverScene,
  Scene,
  SignScene,
  VerifyScene,
  mixins
}
