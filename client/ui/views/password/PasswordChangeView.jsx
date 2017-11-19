/**
 * PasswordChangeView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone, TheCondition } from 'the-components'
import { asView } from '../../wrappers'
import styles from './PasswordChangeView.pcss'
import { PasswordChangeForm } from '../../bounds'
import { Urls, Icons } from '@self/conf'

function PasswordChangeView ({
                               l,
                               user,
                               done,
                               onAgain
                             }) {
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={null}
                      text={l('titles.PASSWORD_CHANGE_TITLE')}
      />
      <TheView.Body>
        <TheCondition if={done}>
          <div>
            <TheDone message={l('messages.PASSWORD_UPDATE_DONE')}
                     onLinkClick={onAgain}
                     linkTo={Urls.ACCOUNT_PASSWORD_URL}
                     linkText={l('buttons.SHOW_PASSWORD_EDIT_AGAIN')}
            />
          </div>
        </TheCondition>
        <TheCondition unless={done}>
          <div>
            <PasswordChangeForm {...{user}} />
          </div>
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  PasswordChangeView,
  (state) => ({
    user: state['account.user'],
    done: state['password.change.done']
  }),
  ({passwordChangeScene}) => ({
    onMount: () => passwordChangeScene.init(),
    onAgain: () => passwordChangeScene.set({done: false})
  }),
  {
    title: ({l}) => l('titles.PASSWORD_CHANGE_TITLE'),
    onlySigned: true
  }
)
