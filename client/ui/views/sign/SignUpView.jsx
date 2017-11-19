/**
 * SignUpView component
 */
'use strict'

import React from 'react'
import { TheView, TheButtonGroup, TheButton } from 'the-components'
import { asView } from '../../wrappers'
import { SignUpForm } from '../../bounds'
import { Icons, Urls } from '@self/conf'
import styles from './SignUpView.pcss'

function SignUpView ({
                       l
                     }) {

  return (
    <TheView className={styles.self}>
      <TheView.Header icon={Icons.SIGNUP_ICON}
                      text={l('titles.SIGNUP_VIEW_TITLE')}
      />
      <TheView.Body narrow>
        <SignUpForm/>
        <br/>
        <hr/>
        <TheButtonGroup>
          <TheButton simple
                     small
                     to={Urls.SIGNIN_URL}>
            {l('buttons.SHOW_SIGNIN_WITH_EXISTING')}
          </TheButton>
        </TheButtonGroup>
        <br/>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  SignUpView,
  (state) => ({
    user: state['account.user']
  }),
  ({signUpScene}, propsProxy) => ({
    onMount: () => {
      const {user} = propsProxy
      if (user) {
        signUpScene.goBack()
      } else {
        signUpScene.init()
      }
    }
  }),
  {
    title: ({l}) => l('titles.SIGNUP_VIEW_TITLE')
  }
)
