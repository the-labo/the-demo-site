/**
 * ProfileEditView component
 */
'use strict'

import React from 'react'
import { cycled, localized, stateful, titled } from 'the-component-mixins'
import { TheCondition, TheDone, TheView } from 'the-components'
import { Icons, Urls } from '@self/conf'
import styles from './ProfileEditView.pcss'
import { ProfileEditForm } from '../../stateful'
import { onlySigned } from '../../wrappers'

@onlySigned
@localized
@cycled
@titled(({l}) => l('titles.PROFILE_EDIT_TITLE'))
class ProfileEditView extends React.Component {
  render () {
    const {
      busy,
      done,
      l,
      onAgain,
      title,
      user,
    } = this.props

    return (
      <TheView className={styles.self}
               spinning={busy}>
        <TheView.Header icon={Icons.PROFILE_ICON}
                        leftIcon={Icons.BACK_ICON}
                        leftTo={Urls.ACCOUNT_MYPAGE_URL}
                        text={title}
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

export default stateful(
  (state) => ({
    busy: state['account.busy'],
    done: state['profile.edit.done'],
    user: state['account.entity'],
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
)(ProfileEditView)
