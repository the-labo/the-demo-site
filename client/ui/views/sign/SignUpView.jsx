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
      <TheView.Header icon={Icons.SIGN_UP_ICON}
                      text={l('titles.SIGN_UP_VIEW_TITLE')}
      />
      <TheView.Body narrow>
        <SignUpForm/>
        <br/>
        <hr/>
        <TheButtonGroup>
          <TheButton simple
                     small
                     to={Urls.SIGN_IN_URL}>
            {l('buttons.SHOW_SIGN_IN_WITH_EXISTING')}
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
  ({
     signAskScene,
     signUpScene,
   }, propsProxy) => ({
    onMount: () => {
      signAskScene.init()
      const {user} = propsProxy
      if (user) {
        signUpScene.goBack()
      } else {
        signUpScene.init()
      }
    }
  }),
  {
    title: ({l}) => l('titles.SIGN_UP_VIEW_TITLE')
  }
)
