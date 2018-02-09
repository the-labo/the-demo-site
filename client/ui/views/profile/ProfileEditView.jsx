/**
 * ProfileEditView component
 */
'use strict'

import React from 'react'
import { TheCondition, TheDone, TheView } from 'the-components'
import { Icons, Urls } from '@self/conf'
import styles from './ProfileEditView.pcss'
import { ProfileEditForm } from '../../bounds'
import { asView } from '../../wrappers'

class ProfileEditView extends React.Component {
  render () {
    const {
                            busy,
                            done,
                            l,
                            onAgain,
                            user,
    } = this.props
    
  return (
    <TheView className={styles.self}
             spinning={busy}>
      <TheView.Header icon={Icons.PROFILE_ICON}
                      leftIcon={Icons.BACK_ICON}
                      leftTo={Urls.ACCOUNT_MYPAGE_URL}
                      text={l('titles.PROFILE_EDIT_TITLE')}
      />
      <TheView.Body>
        <TheCondition if={done}>
          <div>
            <TheDone linkText={l('buttons.SHOW_PROFILE_EDIT_AGAIN')}
                     linkTo={Urls.ACCOUNT_PROFILE_URL}
                     message={l('messages.PROFILE_UPDATE_DONE')}
                     onLinkClick={onAgain}
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
      profileEditScene.set({done: false})
      await propsProxy.onPrepareProfile()
    },
    onMount: async () => {
      profileEditScene.init()
      await propsProxy.onPrepareProfile()
    },
    onPrepareProfile: async () => {
      await accountScene.doSync()
      const {profile} = accountScene.get('user')
      profileEditScene.setEntryFromEntity(profile)
    },
  }),
  {
    onlySigned: true,
    title: ({l}) => l('titles.PROFILE_EDIT_TITLE'),
  }
)
