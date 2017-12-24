/**
 * Scene mapping
 * @namespace SceneMapping
 */
'use strict'

const sc = require('../scenes')

module.exports = Object.freeze({
  'accountScene': sc.AccountScene,
  'appScene': sc.AppScene,
  'cautionDisconnectedScene': sc.CautionDisconnectedScene,
  'passwordChangeScene': sc.PasswordChangeScene,
  'profileEditScene': sc.ProfileEditScene,
  'quitScene': sc.QuitScene,
  'recoverResetScene': sc.RecoverResetScene,
  'recoverSendScene': sc.RecoverSendScene,
  'scene': sc.Scene,
  'signAskScene': sc.SignAskScene,
  'signInScene': sc.SignInScene,
  'signOutScene': sc.SignOutScene,
  'signUpScene': sc.SignUpScene,
  'toastScene': sc.ToastScene,
  'userCheckScene': sc.UserCheckScene,
  'userCreateScene': sc.UserCreateScene,
  'userDestroyScene': sc.UserDestroyScene,
  'userListScene': sc.UserListScene,
  'userPasswordScene': sc.UserPasswordScene,
  'userSearchScene': sc.UserSearchScene,
  'verifyConfirmScene': sc.VerifyConfirmScene,
  'verifyNeedScene': sc.VerifyNeedScene,
  'verifySendScene': sc.VerifySendScene,
})
