/**
 * SignSigninView component
 */
'use strict'

import React from 'react'
import { TheView, TheButton, TheButtonGroup } from 'the-components'
import { asView } from '../../wrappers'
import { SigninForm } from '../../fragments'
import { Icons, Urls } from '@self/conf'
import styles from './SignSigninView.pcss'

function SignSigninView ({
                           l
                         }) {
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={Icons.SIGNIN_ICON}
                      text={l('titles.SIGNIN_VIEW_TITLE')}
      />
      <TheView.Body narrow>
        <SigninForm/>

        <TheButtonGroup collapsed>
          <TheButton to={Urls.SIGNUP_URL}>{l('buttons.SHOW_NEW_ACCOUNT')}</TheButton>
          <TheButton to={Urls.RECOVER_SEND_URL}
          >{l('buttons.SHOW_RECOVER_SEND')}</TheButton>
        </TheButtonGroup>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  SignSigninView,
  (state) => ({
    user: state['auth.user']
  }),
  ({auth: {signinScene}}) => ({
    onSetup: () => signinScene.setEntryValues({}),
    onTeardown: () => signinScene.dropEntryValues(),
    onReceive: ({user}) => {
      if (user) {
        console.warn('[SigninView] Already signed')
        signinScene.putBack()
      }
    }
  }),
  {
    title: ({l}) => l('titles.SIGNIN_VIEW_TITLE')
  }
)
