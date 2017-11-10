/**
 * SignSignupView component
 */
'use strict'

import React from 'react'
import { TheView, TheButtonGroup, TheButton } from 'the-components'
import { asView, withTitle } from '../../wrappers'
import { SignupForm } from '../../fragments'
import { Icons, Urls } from '@self/conf'
import styles from './SignSignupView.pcss'

class SignSignupView extends React.Component {
  render () {
    const s = this
    const {
      l
    } = s.props

    return (
      <TheView className={styles.self}>
        <TheView.Header icon={Icons.SIGNUP_ICON}
                        text={l('titles.SIGNUP_VIEW_TITLE')}
        />
        <TheView.Body narrow>
          <SignupForm/>
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
      console.warn('[SignupView] Already signed')
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
  withTitle(SignSignupView, ({l}) => l('titles.SIGNUP_VIEW_TITLE')),
  (state) => ({
    user: state['auth.user']
  }),
  ({signupScene}) => ({
    onSetup: () => signupScene.setEntryValues({}),
    onTeardown: () => signupScene.dropEntryValues(),
    onSkip: () => signupScene.putBack()
  })
)
