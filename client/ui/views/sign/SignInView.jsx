/**
 * SignInView component
 */
'use strict'

import React from 'react'
import { TheButton, TheButtonGroup, TheView } from 'the-components'
import { Icons, Urls } from '@self/conf'
import styles from './SignInView.pcss'
import { SignInForm } from '../../bounds'
import { asView } from '../../wrappers'

class SignInView extends React.Component {
  render () {
    const {
                       l,
    } = this.props
    
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={Icons.SIGN_IN_ICON}
                      text={l('titles.SIGN_IN_TITLE')}
      />
      <TheView.Body narrow>
        <SignInForm/>

        <TheButtonGroup collapsed>
          <TheButton to={Urls.SIGN_UP_URL}>{l('buttons.SHOW_NEW_ACCOUNT')}</TheButton>
          <TheButton to={Urls.ACCOUNT_RECOVER_URL}
          >{l('buttons.SHOW_RECOVER_SEND')}</TheButton>
        </TheButtonGroup>
      </TheView.Body>
    </TheView>
  )

  }
}

export default asView(
  SignInView,
  (state) => ({
    user: state['account.user'],
  }),
  ({signInScene}) => ({
    onMount: () => signInScene.init(),
    onReceive: ({user}) => {
      if (user) {
        console.warn('[SigninView] Already signed')
        signInScene.goBack()
      }
    },
  }),
  {
    title: ({l}) => l('titles.SIGN_IN_TITLE'),
  }
)
