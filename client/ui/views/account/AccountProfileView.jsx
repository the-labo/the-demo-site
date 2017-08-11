/**
 * AccountProfileView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone } from 'the-components'
import { asView, onlySigned } from '../../wrappers'
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
    const { props, accountScene, signScene } = s
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

          {
            done ? (
              <div>
                <TheDone message={l('messages.PROFILE_UPDATE_DONE')}
                         onLinkClick={() => accountScene.toggleProfileUpdateDone(false)}
                         linkTo={Urls.ACCOUNT_PROFILE_URL}
                         linkText={l('buttons.SHOW_PROFILE_EDIT_AGAIN')}
                />
              </div>
            ) : (
              <div>
                {
                  values && (
                    <ProfileForm {...{ user, values, errors }}
                                 onUpdate={(values) => accountScene.setProfileEntryValues(values)}
                                 onSubmit={async () => {
                                   await accountScene.doUpdateProfile()
                                   await signScene.syncSigned()
                                   accountScene.toggleProfileUpdateDone(true)
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
    const { accountScene } = s

    ;(async () => {
      accountScene.toggleProfileUpdateDone(false)
      await accountScene.syncProfileEntry()
    })()
  }

  componentWillUnmount () {
  }
}

export default asView(onlySigned(AccountProfileView), (state) => ({
  user: state[ 'sign.signed.user' ],
  busy: state[ 'account.profile.busy' ],
  done: state[ 'account.profile.done' ],
  values: state[ 'account.profile.entry.values' ],
  errors: state[ 'account.profile.entry.errors' ]
}))
