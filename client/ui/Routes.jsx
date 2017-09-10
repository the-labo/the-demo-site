'use strict'

import React from 'react'
import { Urls } from '@self/conf'
import { TheRoute } from 'the-components'

import * as v from './views'
import { withLoc } from 'the-loc'

const Routes = ({l, user}) => (
  <TheRoute.Switch>
    <TheRoute exact path={Urls.TOP_URL} component={v.HomeView}/>

    <TheRoute scrollToTop exact path={Urls.ABOUT_TERMS_OF_USE_URL} component={v.AboutTermsOfUseView}/>
    <TheRoute scrollToTop exact path={Urls.ABOUT_PRIVACY_POLICY_URL} component={v.AboutPrivacyPolicyView}/>


    <TheRoute exact path={Urls.ADMIN_URL} component={v.AdminTopView}/>
    <TheRoute exact path={Urls.ADMIN_USERS_URL} component={v.AdminUsersView}/>

    <TheRoute exact path={Urls.VERIFY_CONFIRM_URL} component={v.VerifyConfirmView}/>
    <TheRoute exact path={Urls.RECOVER_SEND_URL} component={v.RecoverSendView}/>
    <TheRoute exact path={Urls.RECOVER_RESET_URL} component={v.RecoverResetView}/>

    <TheRoute exact path={Urls.ACCOUNT_MYPAGE_URL} component={v.AccountMypageView}/>
    <TheRoute exact path={Urls.ACCOUNT_PASSWORD_URL} component={v.AccountPasswordView}/>
    <TheRoute exact path={Urls.ACCOUNT_PROFILE_URL} component={v.AccountProfileView}/>

    <TheRoute exact path={Urls.SIGNIN_URL} component={v.SignSigninView}/>
    <TheRoute exact path={Urls.SIGNUP_URL} component={v.SignSignupView}/>
    <TheRoute exact path={Urls.SIGNOUT_URL} component={v.SignSignoutView}/>
    <TheRoute exact path={Urls.SIGNDEL_URL} component={v.SignSigndelView}/>
      <TheRoute exact path={Urls.SIGNASK_URL} component={v.SignSignaskView}/>

    <TheRoute component={v.ErrorNotfoundView}/>
  </TheRoute.Switch>
)

export default withLoc(Routes)
