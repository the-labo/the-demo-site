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
                      leftIcon={Icons.BACK_ICON}
                      leftTo={Urls.ACCOUNT_MYPAGE_URL}
                      text={l('titles.PASSWORD_CHANGE_TITLE')}
      />
      <TheView.Body>
        <TheCondition if={done}>
          <div>
            <TheDone linkText={l('buttons.SHOW_PASSWORD_EDIT_AGAIN')}
                     linkTo={Urls.ACCOUNT_PASSWORD_URL}
                     message={l('messages.PASSWORD_UPDATE_DONE')}
                     onLinkClick={onAgain}
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
    onlySigned: true,
    title: ({l}) => l('titles.PASSWORD_CHANGE_TITLE'),
  }
)
