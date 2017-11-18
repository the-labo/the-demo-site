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
                        l, busy
                      }) {
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={Icons.SIGNOUT_ICON}
                      text={l('titles.SIGNOUT_VIEW_TITLE')}
      />
      <TheView.Body>
        <TheView.Message>
          {busy ? l('messages.WORKING_SIGNOUT') : l('messages.WORKING_DONE')}
        </TheView.Message>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  SignOutView,
  (state) => ({
    user: state['account.user'],
    busy: state['sign.out.busy']
  }),
  ({signoutScene}) => ({
    onReady: () => signoutScene.doSignout()
  }),
  {
    title: ({l}) => l('titles.SIGNOUT_VIEW_TITLE')
  }
)
