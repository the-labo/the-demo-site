/**
 * ProfileEditView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone, TheCondition } from 'the-components'
import { asView, onlySigned } from '../../wrappers'
import { ProfileEditForm } from '../../bounds'
import styles from './ProfileEditView.pcss'
import { Urls, Icons } from '@self/conf'

function ProfileEditView ({
                            l,
                            busy,
                            user,
                            done,
                            onAgain
                          }) {
  return (
    <TheView className={styles.self}
             spinning={busy}
    >
      <TheView.Header icon={Icons.PROFILE_ICON}
                      text={l('titles.PROFILE_EDIT_TITLE')}
      />
      <TheView.Body>
        <TheCondition if={done}>
          <div>
            <TheDone message={l('messages.PROFILE_UPDATE_DONE')}
                     onLinkClick={onAgain}
                     linkTo={Urls.ACCOUNT_PROFILE_URL}
                     linkText={l('buttons.SHOW_PROFILE_EDIT_AGAIN')}
            />
          </div>
        </TheCondition>
        <TheCondition unless={done}>
          <div>
            <ProfileEditForm {...{user}} />
          </div>
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  ProfileEditView,
  (state) => ({
    user: state['account.user'],
    busy: state['profile.edit.busy'],
    done: state['profile.edit.done']
  }),
  ({
     profileEditScene
   }) => ({
    onMount: () => profileEditScene.doSync(),
    onAgain: () => profileEditScene.set({done: false})
  }),
  {
    title: ({l}) => l('titles.PROFILE_EDIT_TITLE'),
    onlySigned: true
  }
)
