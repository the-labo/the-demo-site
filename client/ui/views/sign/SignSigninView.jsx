/**
 * SignSigninView component
 */
'use strict'

import React from 'react'
import { TheView, TheButton } from 'the-components'
import { asView } from '../../wrappers'
import { SigninForm, PasswordResetDialog } from '../../fragments'
import { SignScene } from '../../../scenes'
import { Icons, Urls } from '@self/conf'
import styles from './SignSigninView.pcss'

class SignSigninView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
    s.signScene = new SignScene(props)
  }

  render () {
    const s = this
    const {props, signScene} = s
    const {
      l,
      busy,
      values,
      errors,
      resetting
    } = props
    return (
      <TheView className={styles.self}>
        <TheView.Header icon={Icons.SIGNIN_ICON}
                        text={l('titles.SIGNIN_VIEW_TITLE')}
        />
        <TheView.Body narrow>
          <SigninForm {...{values, errors}}
                      spinning={busy}
                      onUpdate={(values) => signScene.setSigninValues(values)}
                      onSubmit={() => signScene.doSignin()}
          />

          <div className={styles.actionRow}>
            <TheButton to={Urls.SIGNUP_URL} simple>{l('buttons.SHOW_NEW_ACCOUNT')}</TheButton>
            <TheButton onClick={() => signScene.toggleResetting(true)}
                       simple>{l('buttons.SHOW_PASSWORD_RESET')}</TheButton>
          </div>

          {
            resetting && (
              <PasswordResetDialog onClose={() => signScene.toggleResetting(false)}/>
            )
          }
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
    const s = this
    const {signScene} = s
    signScene.toggleResetting(false)
  }

  componentWillReceiveProps (nextProps) {
    const s = this
    const {signScene} = s
    const {user} = nextProps

    ;(async () => {
      if (user) {
        console.warn('[SigninView] Already signed')
        await signScene.finishSignin()
      }
    })()
  }

  componentWillUnmount () {
  }

}

export default asView(SignSigninView, (state) => ({
  user: state['sign.signed.user'],
  busy: state['sign.signin.busy'],
  resetting: state['sign.resetting'],
  values: state['sign.signin.entry.values'],
  errors: state['sign.signin.entry.errors']
}))
