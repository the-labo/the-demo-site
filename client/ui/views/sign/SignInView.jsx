/**
 * SignInView component
 */
'use strict'

import React from 'react'
import { cycled, localized, stateful, titled } from 'the-component-mixins'
import { TheButton, TheButtonGroup, TheView } from 'the-components'
import { Icons, Urls } from '@self/conf'
import styles from './SignInView.pcss'
import { SignInForm } from '../../bounds'

@localized
@cycled
@titled(({l}) => l('titles.SIGN_IN_TITLE'))
class SignInView extends React.Component {
  render () {
    const {
      l,
      title,
    } = this.props

    return (
      <TheView className={styles.self}>
        <TheView.Header icon={Icons.SIGN_IN_ICON}
                        text={title}
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

export default stateful(
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
)(SignInView)
