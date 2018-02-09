/**
 * SignOutView component
 */
'use strict'

import React from 'react'
import { cycled, localized, stateful, titled } from 'the-component-mixins'
import { TheView } from 'the-components'
import { Icons } from '@self/conf'
import styles from './SignOutView.pcss'

@localized
@cycled
@titled(({l}) => l('titles.SIGN_OUT_TITLE'))
class SignOutView extends React.Component {
  render () {
    const {
      busy,
      done,
      l,
      title,
    } = this.props

    return (
      <TheView className={styles.self}>
        <TheView.Header icon={Icons.SIGN_OUT_ICON}
                        text={title}
        />
        <TheView.Body>
          <TheView.Message>
            {busy && l('messages.WORKING_SIGN_OUT')}
            {done && l('messages.WORKING_DONE')}
          </TheView.Message>
        </TheView.Body>
      </TheView>
    )

  }
}

export default stateful(
  (state) => ({
    busy: state['sign.out.busy'],
    done: state['sign.out.done'],
    user: state['account.user'],
  }),
  ({
     accountScene,
     signOutScene,
   }) => ({
    onMount: async () => {
      signOutScene.init()
      await signOutScene.doSignout()
      await accountScene.doSync()
      signOutScene.set({done: true})
      signOutScene.goBack()
    },
  }),
)(SignOutView)
