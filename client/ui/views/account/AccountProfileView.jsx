/**
 * AccountProfileView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone, TheCondition } from 'the-components'
import { asView, withTitle, onlySigned } from '../../wrappers'
import { ProfileForm } from '../../fragments'
import styles from './AccountProfileView.pcss'
import { AccountScene, SignScene } from '../../../scenes'
import { Urls, Icons } from '@self/conf'

class AccountProfileView extends React.Component {
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
               spinning={busy}
      >
        <TheView.Header icon={Icons.PROFILE_ICON}
                        text={l('titles.ACCOUNT_PROFILE_TITLE')}
        />
        <TheView.Body>
          <TheCondition if={done}>
            <div>
              <TheDone message={l('messages.PROFILE_UPDATE_DONE')}
                       onLinkClick={() => accountScene.toggleProfileUpdateDone(false)}
                       linkTo={Urls.ACCOUNT_PROFILE_URL}
                       linkText={l('buttons.SHOW_PROFILE_EDIT_AGAIN')}
              />
            </div>
          </TheCondition>
          <TheCondition unless={done}>
            <div>
              <TheCondition if={Boolean(values)}>
                <ProfileForm {...{user, values, errors}}
                             onUpdate={(values) => accountScene.setProfileEntryValues(values)}
                             onSubmit={async () => {
                               await accountScene.doUpdateProfile()
                               await signScene.syncSigned()
                               accountScene.toggleProfileUpdateDone(true)
                             }}
                />
              </TheCondition>
            </div>
          </TheCondition>
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
    const s = this
    const {accountScene} = s

    ;(async () => {
      accountScene.toggleProfileUpdateDone(false)
      await accountScene.syncProfileEntry()
    })()
  }

  componentWillUnmount () {
  }
}

export default asView(
  withTitle(
    onlySigned(AccountProfileView),
    ({l}) => l('titles.ACCOUNT_PASSWORD_TITLE')
  ),
  (state) => ({
    user: state['sign.signed.user'],
    busy: state['account.profile.busy'],
    done: state['account.profile.done'],
    values: state['account.profile.entry.values'],
    errors: state['account.profile.entry.errors']
  })
)
