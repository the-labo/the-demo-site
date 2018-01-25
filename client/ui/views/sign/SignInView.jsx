/**
 * SignInView component
 */
'use strict'

import React from 'react'
import { TheView, TheButton, TheButtonGroup } from 'the-components'
import { asView } from '../../wrappers'
import { SignInForm } from '../../bounds'
import { Icons, Urls } from '@self/conf'
import styles from './SignInView.pcss'

function SignInView ({
                       l
                     }) {
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={Icons.SIGNIN_ICON}
                      text={l('titles.SIGNIN_VIEW_TITLE')}
      />
      <TheView.Body narrow>
        <SignInForm/>

        <TheButtonGroup collapsed>
          <TheButton to={Urls.SIGNUP_URL}>{l('buttons.SHOW_NEW_ACCOUNT')}</TheButton>
          <TheButton to={Urls.ACCOUNT_RECOVER_URL}
          >{l('buttons.SHOW_RECOVER_SEND')}</TheButton>
        </TheButtonGroup>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  SignInView,
  (state) => ({
    user: state['account.user']
  }),
  ({signInScene}) => ({
    onMount: () => signInScene.init(),
    onReceive: ({user}) => {
      if (user) {
        console.warn('[SigninView] Already signed')
        signInScene.goBack()
      }
    }
  }),
  {
    title: ({l}) => l('titles.SIGNIN_VIEW_TITLE')
  }
)
