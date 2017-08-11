/**
 * AccountPasswordView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone } from 'the-components'
import { asView, onlySigned } from '../../wrappers'
import styles from './AccountPasswordView.pcss'
import { AccountScene, SignScene } from '../../../scenes'
import { PasswordForm } from '../../fragments'
import { Urls, Icons } from '@self/conf'

class AccountPasswordView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
    s.accountScene = new AccountScene(props)
    s.signScene = new SignScene(props)
  }

  render () {
    const s = this
    const {props, accountScene, signScene} = s
    const {
      busy,
      user,
      values,
      l,
      done,
      errors
    } = props
    return (
      <TheView className={styles.self}
               spinning={busy}>
        <TheView.Header icon={null}
                        text={l('titles.ACCOUNT_PASSWORD_TITLE')}
        />
        <TheView.Body>

          {
            done ? (
              <div>
                <TheDone message={l('messages.PASSWORD_UPDATE_DONE')}
                         onLinkClick={() => accountScene.togglePasswordUpdateDone(false)}
                         linkTo={Urls.ACCOUNT_PASSWORD_URL}
                         linkText={l('buttons.SHOW_PASSWORD_EDIT_AGAIN')}
                />
              </div>
            ) : (
              <div>

                {
                  user && values && (
                    <PasswordForm {...{user, values, errors}}
                                  onUpdate={(values) => accountScene.setPasswordEntryValues(values)}
                                  onSubmit={async () => {
                                    await accountScene.doUpdatePassword()
                                    await signScene.syncSigned()
                                    await accountScene.togglePasswordUpdateDone(true)
                                  }}
                    />
                  )
                }
              </div>
            )
          }

        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
    const s = this
    const {props, accountScene} = s

    if (props.done) {
      accountScene.togglePasswordUpdateDone(false)
    }
  }

  componentWillUnmount () {
  }
}

export default asView(onlySigned(AccountPasswordView), (state) => ({
  user: state['sign.signed.user'],
  busy: state['account.password.busy'],
  done: state['account.password.done'],
  values: state['account.password.entry.values'],
  errors: state['account.password.entry.errors']
}))
