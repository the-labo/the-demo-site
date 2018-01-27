/**
 * Scene classes
 * @module scenes
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

module.exports = {
  get AccountScene () { return _d(require('./AccountScene')) },
  get AdminUserCheckScene () { return _d(require('./AdminUserCheckScene')) },
  get AdminUserCreateScene () { return _d(require('./AdminUserCreateScene')) },
  get AdminUserDestroyScene () { return _d(require('./AdminUserDestroyScene')) },
  get AdminUserListScene () { return _d(require('./AdminUserListScene')) },
  get AdminUserPasswordScene () { return _d(require('./AdminUserPasswordScene')) },
  get AdminUserSearchScene () { return _d(require('./AdminUserSearchScene')) },
  get AppScene () { return _d(require('./AppScene')) },
  get CautionDisconnectedScene () { return _d(require('./CautionDisconnectedScene')) },
  get PasswordChangeScene () { return _d(require('./PasswordChangeScene')) },
  get ProfileEditScene () { return _d(require('./ProfileEditScene')) },
  get QuitScene () { return _d(require('./QuitScene')) },
  get RecoverResetScene () { return _d(require('./RecoverResetScene')) },
  get RecoverSendScene () { return _d(require('./RecoverSendScene')) },
  get Scene () { return _d(require('./Scene')) },
  get SignAskScene () { return _d(require('./SignAskScene')) },
  get SignInScene () { return _d(require('./SignInScene')) },
  get SignOutScene () { return _d(require('./SignOutScene')) },
  get SignUpScene () { return _d(require('./SignUpScene')) },
  get ToastScene () { return _d(require('./ToastScene')) },
  get VerifyConfirmScene () { return _d(require('./VerifyConfirmScene')) },
  get VerifyNeedScene () { return _d(require('./VerifyNeedScene')) },
  get VerifySendScene () { return _d(require('./VerifySendScene')) },
}
