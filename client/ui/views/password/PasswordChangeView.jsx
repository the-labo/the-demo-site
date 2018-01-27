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
                               done,
                               l,
                               onAgain,
                               user,
                             }) {
  return (
    <TheView className={styles.self}>
      <TheView.Header icon={null}
                      text={l('titles.PASSWORD_CHANGE_TITLE')}
                      leftIcon={Icons.BACK_ICON}
                      leftTo={Urls.ACCOUNT_MYPAGE_URL}
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
    done: state['password.change.done'],
    user: state['account.user'],
  }),
  ({passwordChangeScene}) => ({
    onAgain: async () => {
      passwordChangeScene.set({done: false})
    },
    onMount: () => passwordChangeScene.init(),
  }),
  {
    title: ({l}) => l('titles.PASSWORD_CHANGE_TITLE'),
    onlySigned: true
  }
)
