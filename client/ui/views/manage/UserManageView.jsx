/**
 * UserManageView component
 */
'use strict'

import React from 'react'
import {
  TheView,
  TheCondition
} from 'the-components'
import { asView } from '../../wrappers'
import styles from './UserManageView.pcss'
import {
  UserSearchForm,
  UserActionBar,
  UserPager,
  UserCreateDialog,
  UserList
} from '../../bounds'
import { Icons, Urls } from '@self/conf'

function UserManageView ({
                           l,
                           ready,
                           busy,
                           onCreate
                         }) {
  return (
    <TheView className={styles.self}
             spinning={busy}
    >
      <TheView.Header leftTo={Urls.ADMIN_URL}
                      icon={Icons.USERS_ICON}
                      text={l('titles.ADMIN_USERS_TITLE')}
                      rightText={l('buttons.SHOW_USER_CREATE')}
                      onRightClick={onCreate}
      />
      <TheView.Body>
        <div className={styles.searchRow}>
          <UserSearchForm/>
        </div>
        <TheCondition if={ready}>
          <div>
            <UserPager showCounts/>
            <UserList/>
            <UserPager/>
            <UserActionBar/>
            <UserCreateDialog/>
          </div>
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  UserManageView,
  (state) => ({
    ready: !!state['user.list.entities']
  }),
  ({
     userListScene,
     userSearchScene,
     userCheckScene,
     userCreateScene
   }) => ({
    onMount: async () => {
      userListScene.init()
      userSearchScene.init()
      userCheckScene.init()
      userCreateScene.init()
      await userListScene.doSync()
    },
    onTearDown: () => {},
    onCreate: () => userCreateScene.set({active: true})
  }),
  {}
)
