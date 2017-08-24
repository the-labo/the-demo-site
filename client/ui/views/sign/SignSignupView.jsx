/**
 * SignSignupView component
 */
'use strict'

import React from 'react'
import { TheView, TheButtonGroup, TheButton } from 'the-components'
import { asView, withTitle } from '../../wrappers'
import { SignupForm } from '../../fragments'
import { SignScene, VerifyScene } from '../../../scenes'
import { Icons, Urls } from '@self/conf'
import styles from './SignSignupView.pcss'

class SignSignupView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
    s.signScene = new SignScene(props)
    s.verifyScene = new VerifyScene(props)
  }

  render () {
    const s = this
    const {props, signScene} = s
    const {
      l,
      busy,
      values,
      errors
    } = props

    return (
      <TheView className={styles.self}>
        <TheView.Header icon={Icons.SIGNUP_ICON}
                        text={l('titles.SIGNUP_VIEW_TITLE')}
        />
        <TheView.Body>
          <SignupForm {...{values, errors}}
                      spinning={busy}
                      onUpdate={(values) => signScene.setSignupValues(values)}
                      onSubmit={() => signScene.doSignup()}
          />
          <br/>
          <hr/>
          <TheButtonGroup>
            <TheButton simple
                       style={{fontSize: 'small'}}
                       to={Urls.SIGNIN_URL}>{l('buttons.SHOW_SIGNIN_WITH_EXISTING')}</TheButton>
          </TheButtonGroup>
          <br/>
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
  }

  componentWillReceiveProps (nextProps) {
    const s = this
    const {signScene, verifyScene} = s
    const {user} = nextProps

    ;(async () => {
      if (user) {
        console.warn('[SignupView] Already signed')
        await signScene.finishSignup()
        await verifyScene.sendVerify()
      }
    })()
  }

  componentWillUnmount () {
  }
}

export default asView(
  withTitle(SignSignupView, ({l}) => l('titles.SIGNUP_VIEW_TITLE')),
  (state) => ({
    user: state['sign.signed.user'],
    busy: state['sign.signup.busy'],
    values: state['sign.signup.entry.values'],
    errors: state['sign.signup.entry.errors']
  })
)
