'use strict'

import { Urls } from '@self/conf'
import React from 'react'
import { isProduction } from 'the-check'
import { TheRoute, TheRouteStack } from 'the-components'
import { withLoc } from 'the-loc'
import { hashProxy } from 'the-site-util'
import * as views from './views'

const v = isProduction() ? views : hashProxy(views, {unknownCheck: true})

const Routes = ({}) => (
  <TheRoute.Switch>
    <TheRoute component={v.HomeView} exact path={Urls.TOP_URL}/>

    <TheRoute component={v.AboutTermsOfUseView} exact path={Urls.ABOUT_TERMS_OF_USE_URL} scrollToTop/>
    <TheRoute component={v.AboutPrivacyPolicyView} exact path={Urls.ABOUT_PRIVACY_POLICY_URL} scrollToTop/>


    <TheRoute path={Urls.ADMIN_URL}>
      <TheRouteStack stack={[
        [Urls.ADMIN_URL, v.AdminTopView,],
        [Urls.ADMIN_USER_MANAGE_URL, v.AdminUserManageView,],
      ]}/>
    </TheRoute>

    <TheRoute component={v.VerifyConfirmView} exact path={Urls.ACCOUNT_VERIFY_URL}/>
    <TheRoute component={v.RecoverSendView} exact path={Urls.ACCOUNT_RECOVER_URL}/>
    <TheRoute component={v.RecoverResetView} exact path={Urls.ACCOUNT_RECOVER_RESET_URL}/>

    <TheRoute component={v.MypageView} exact path={Urls.ACCOUNT_MYPAGE_URL}/>
    <TheRoute component={v.PasswordChangeView} exact path={Urls.ACCOUNT_PASSWORD_URL}/>
    <TheRoute component={v.ProfileEditView} exact path={Urls.ACCOUNT_PROFILE_URL}/>

    <TheRoute component={v.SignInView} exact path={Urls.SIGN_IN_URL}/>
    <TheRoute component={v.SignUpView} exact path={Urls.SIGN_UP_URL}/>
    <TheRoute component={v.SignOutView} exact path={Urls.SIGN_OUT_URL}/>
    <TheRoute component={v.QuitView} exact path={Urls.ACCOUNT_QUIT_URL}/>
    <TheRoute component={v.SignAskView} exact path={Urls.SIGN_ASK_URL}/>

    <TheRoute component={v.ErrorNotfoundView} exact path={Urls.ERROR_NOTFOUND_URL}/>
    <TheRoute component={v.ErrorForbiddenView} exact path={Urls.ERROR_FORBIDDEN_URL}/>

    <TheRoute component={v.ErrorNotfoundView}/>
  </TheRoute.Switch>
)

export default withLoc(Routes)
