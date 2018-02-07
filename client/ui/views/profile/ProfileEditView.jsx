/**
 * ProfileEditView component
 */
'use strict'

import React from 'react'
import { TheView, TheDone, TheCondition } from 'the-components'
import { asView } from '../../wrappers'
import { ProfileEditForm } from '../../bounds'
import styles from './ProfileEditView.pcss'
import { Urls, Icons } from '@self/conf'

function ProfileEditView ({
                            busy,
                            done,
                            l,
                            onAgain,
                            user,
                          }) {
  return (
    <TheView className={styles.self}
             spinning={busy}>
      <TheView.Header icon={Icons.PROFILE_ICON}
                      text={l('titles.PROFILE_EDIT_TITLE')}
                      leftIcon={Icons.BACK_ICON}
                      leftTo={Urls.ACCOUNT_MYPAGE_URL}
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
            <ProfileEditForm {...{user,}} />
          </div>
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  ProfileEditView,
  (state) => ({
    busy: state['account.busy'],
    done: state['profile.edit.done'],
    user: state['account.user'],
  }),
  ({
     accountScene,
     profileEditScene,
   }, propsProxy) => ({
    onAgain: async () => {
      profileEditScene.set({done: false,})
      await propsProxy.onPrepareProfile()
    },
    onMount: async () => {
      profileEditScene.init()
      await propsProxy.onPrepareProfile()
    },
    onPrepareProfile: async () => {
      await accountScene.doSync()
      const {profile,} = accountScene.get('user')
      profileEditScene.setEntryFromEntity(profile)
    },
  }),
  {
    onlySigned: true,
    title: ({l,}) => l('titles.PROFILE_EDIT_TITLE'),
  }
)
