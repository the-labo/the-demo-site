'use strict'

import React from 'react'
import { Urls } from '@self/conf'
import { TheRoute } from 'the-components'

import {
  HomeView,
  AccountPasswordView,
  AboutPrivacyPolicyView,
  AboutTermsOfUseView,
  AdminTopView,
  AdminUsersView,
  ErrorNotfoundView,
  SignSigninView,
  SignSignoutView,
  SignSignupView
} from './views'
import { withLoc } from 'the-loc'

const Routes = ({l}) => (
  <TheRoute.Switch>
    <TheRoute exact path={Urls.TOP_URL} component={HomeView}/>

    <TheRoute scrollToTop exact path={Urls.ABOUT_TERMS_OF_USE_URL} component={AboutTermsOfUseView}/>
    <TheRoute scrollToTop exact path={Urls.ABOUT_PRIVACY_POLICY_URL} component={AboutPrivacyPolicyView}/>


    <TheRoute exact path={Urls.ADMIN_URL} component={AdminTopView}/>
    <TheRoute exact path={Urls.ADMIN_USERS_URL} component={AdminUsersView}/>

    <TheRoute exact path={Urls.SIGNIN_URL} component={SignSigninView}/>
    <TheRoute exact path={Urls.SIGNUP_URL} component={SignSignupView}/>
    <TheRoute exact path={Urls.SIGNOUT_URL} component={SignSignoutView}/>

    <TheRoute component={ErrorNotfoundView}/>
  </TheRoute.Switch>
)

export default withLoc(Routes)
