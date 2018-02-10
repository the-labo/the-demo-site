/**
 * SignUpView component
 */
'use strict'

import React from 'react'
import { cycled, localized, stateful, titled } from 'the-component-mixins'
import { TheButton, TheButtonGroup, TheView } from 'the-components'
import { Icons, Urls } from '@self/conf'
import styles from './SignUpView.pcss'
import { SignUpForm } from '../../stateful'

@localized
@cycled
@titled(({l}) => l('titles.SIGN_UP_TITLE'))
class SignUpView extends React.Component {
  render () {
    const {
      l,
      title,
    } = this.props

    return (
      <TheView className={styles.self}>
        <TheView.Header icon={Icons.SIGN_UP_ICON}
                        text={title}
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
}

export default stateful(
  (state) => ({
    user: state['account.user'],
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
    },
  }),
)(SignUpView)
