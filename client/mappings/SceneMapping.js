/**
 * Scene mapping
 * @namespace SceneMapping
 */
'use strict'

const sc = require('../scenes')

module.exports = Object.freeze({
  'accountScene': sc.AccountScene,
  'adminUserCheckScene': sc.AdminUserCheckScene,
  'adminUserCreateScene': sc.AdminUserCreateScene,
  'adminUserDestroyScene': sc.AdminUserDestroyScene,
  'adminUserListScene': sc.AdminUserListScene,
  'adminUserPasswordScene': sc.AdminUserPasswordScene,
  'adminUserSearchScene': sc.AdminUserSearchScene,
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
  'verifyConfirmScene': sc.VerifyConfirmScene,
  'verifyNeedScene': sc.VerifyNeedScene,
  'verifySendScene': sc.VerifySendScene,
})
