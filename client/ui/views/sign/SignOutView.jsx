/**
 * SignOutView component
 */
'use strict'

import React from 'react'
import { TheView } from 'the-components'
import { asView } from '../../wrappers'
import { Icons } from '@self/conf'
import styles from './SignOutView.pcss'

function SignOutView ({
                        busy,
                        done,
                        l,
                      }) {
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={Icons.SIGNOUT_ICON}
                      text={l('titles.SIGNOUT_VIEW_TITLE')}
      />
      <TheView.Body>
        <TheView.Message>
          {busy && l('messages.WORKING_SIGNOUT')}
          {done && l('messages.WORKING_DONE')}
        </TheView.Message>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  SignOutView,
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
    }
  }),
  {
    title: ({l}) => l('titles.SIGNOUT_VIEW_TITLE')
  }
)
