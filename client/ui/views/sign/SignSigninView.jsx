/**
 * SignSigninView component
 */
'use strict'

import React from 'react'
import { TheView, TheButton, TheButtonGroup } from 'the-components'
import { asView } from '../../wrappers'
import { SigninForm } from '../../fragments'
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
  values: state['sign.signin.entry.values'],
  errors: state['sign.signin.entry.errors']
}))
