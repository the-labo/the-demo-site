'use strict'

import React from 'react'
import { Urls } from '@self/conf'
import { TheRoute } from 'the-components'

import * as v from './views'
import { withLoc } from 'the-loc'

const Routes = ({}) => (
  <TheRoute.Switch>
    <TheRoute exact path={Urls.TOP_URL} component={v.HomeView}/>

    <TheRoute scrollToTop exact path={Urls.ABOUT_TERMS_OF_USE_URL} component={v.AboutTermsOfUseView}/>
    <TheRoute scrollToTop exact path={Urls.ABOUT_PRIVACY_POLICY_URL} component={v.AboutPrivacyPolicyView}/>


    <TheRoute exact path={Urls.ADMIN_URL} component={v.AdminTopView}/>
    <TheRoute exact path={Urls.ADMIN_USER_MANAGE_URL} component={v.UserManageView}/>

    <TheRoute exact path={Urls.ACCOUNT_VERIFY_URL} component={v.VerifyConfirmView}/>
    <TheRoute exact path={Urls.ACCOUNT_RECOVER_URL} component={v.RecoverSendView}/>
    <TheRoute exact path={Urls.ACCOUNT_RECOVER_RESET_URL} component={v.RecoverResetView}/>

    <TheRoute exact path={Urls.ACCOUNT_MYPAGE_URL} component={v.MypageView}/>
    <TheRoute exact path={Urls.ACCOUNT_PASSWORD_URL} component={v.PasswordChangeView}/>
    <TheRoute exact path={Urls.ACCOUNT_PROFILE_URL} component={v.ProfileEditView}/>

    <TheRoute exact path={Urls.SIGNIN_URL} component={v.SignInView}/>
    <TheRoute exact path={Urls.SIGNUP_URL} component={v.SignUpView}/>
    <TheRoute exact path={Urls.SIGNOUT_URL} component={v.SignOutView}/>
    <TheRoute exact path={Urls.ACCOUNT_QUIT_URL} component={v.QuitView}/>
    <TheRoute exact path={Urls.SIGNASK_URL} component={v.SignAskView}/>

    <TheRoute exact path={Urls.ERROR_NOTFOUND_URL} component={v.ErrorNotfoundView}/>
    <TheRoute exact path={Urls.ERROR_FORBIDDEN_URL} component={v.ErrorForbiddenView}/>

    <TheRoute component={v.ErrorNotfoundView}/>
  </TheRoute.Switch>
)

export default withLoc(Routes)
