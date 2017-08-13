'use strict'

import React from 'react'
import { Urls } from '@self/conf'
import { TheRoute } from 'the-components'

import * as views from './views'
import { withLoc } from 'the-loc'

const Routes = ({l}) => (
  <TheRoute.Switch>
    <TheRoute exact path={Urls.TOP_URL} component={views.HomeView}/>

    <TheRoute scrollToTop exact path={Urls.ABOUT_TERMS_OF_USE_URL} component={views.AboutTermsOfUseView}/>
    <TheRoute scrollToTop exact path={Urls.ABOUT_PRIVACY_POLICY_URL} component={views.AboutPrivacyPolicyView}/>


    <TheRoute exact path={Urls.ADMIN_URL} component={views.AdminTopView}/>
    <TheRoute exact path={Urls.ADMIN_USERS_URL} component={views.AdminUsersView}/>

    <TheRoute exact path={Urls.VERIFY_CONFIRM_URL} component={views.VerifyConfirmView}/>
    <TheRoute exact path={Urls.RECOVER_SEND_URL} component={views.RecoverSendView}/>
    <TheRoute exact path={Urls.RECOVER_RESET_URL} component={views.RecoverResetView}/>

    <TheRoute exact path={Urls.ACCOUNT_MYPAGE_URL} component={views.AccountMypageView}/>
    <TheRoute exact path={Urls.ACCOUNT_PASSWORD_URL} component={views.AccountPasswordView}/>
    <TheRoute exact path={Urls.ACCOUNT_PROFILE_URL} component={views.AccountProfileView}/>

    <TheRoute exact path={Urls.SIGNIN_URL} component={views.SignSigninView}/>
    <TheRoute exact path={Urls.SIGNUP_URL} component={views.SignSignupView}/>
    <TheRoute exact path={Urls.SIGNOUT_URL} component={views.SignSignoutView}/>
    <TheRoute exact path={Urls.SIGNDEL_URL} component={views.SignSigndelView}/>

    <TheRoute component={views.ErrorNotfoundView}/>
  </TheRoute.Switch>
)

export default withLoc(Routes)
