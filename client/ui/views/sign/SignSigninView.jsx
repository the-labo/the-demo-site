/**
 * SignSigninView component
 */
'use strict'

import React from 'react'
import { TheView, TheButton, TheButtonGroup } from 'the-components'
import { asView, withTitle } from '../../wrappers'
import { SigninForm } from '../../fragments'
import { Icons, Urls } from '@self/conf'
import styles from './SignSigninView.pcss'

class SignSigninView extends React.Component {
  render () {
    const s = this

    const {
      l
    } = s.props
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

  componentDidMount () {
    const s = this
    const {onSetup} = s.props
    onSetup()
  }

  componentWillReceiveProps (nextProps) {
    const s = this
    const {onSkip} = s.props
    const {user} = nextProps

    if (user) {
      console.warn('[SigninView] Already signed')
      onSkip()
    }
  }

  componentWillUnmount () {
    const s = this
    const {onTeardown} = s.props
    onTeardown()
  }

}

export default asView(
  withTitle(SignSigninView, ({l}) => l('titles.SIGNIN_VIEW_TITLE')),
  (state) => ({
    user: state['auth.user']
  }),
  ({signinScene}) => ({
    onSetup: () => signinScene.setEntryValues({}),
    onTeardown: () => signinScene.dropEntryValues(),
    onSkip: () => signinScene.putBack()
  })
)
