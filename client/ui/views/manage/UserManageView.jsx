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
  UserDestroyDialog,
  UserPasswordDialog,
  UserList
} from '../../bounds'
import { Icons, Urls } from '@self/conf'
import { RoleCodes } from '@self/conf'

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
                      text={l('titles.USER_MANAGE_TITLE')}
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
            <UserList className={styles.list}/>
            <UserPager/>
            <UserActionBar/>
            <UserCreateDialog/>
            <UserDestroyDialog/>
            <UserPasswordDialog/>
          </div>
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  UserManageView,
  (state) => ({
    busy: !state['userList.ready'] && state['userList.busy'],
    ready: state['userList.ready'],
    query: state['app.query']
  }),
  ({
     userListScene,
     userSearchScene,
     userCheckScene,
     userCreateScene
   }, ownProps) => ({
    onMount: async () => {
      userListScene.init()
      userSearchScene.init()
      userCheckScene.init()
      userCreateScene.init()

      const {q} = ownProps.query
      userListScene.setQuery(q)

      await userListScene.readyFor(async () => {
        await userListScene.doSync()
      })
    },
    onTearDown: () => {},
    onCreate: () => {
      userCreateScene.init()
      userCreateScene.set({
        active: true,
        entry: {role: RoleCodes.NORMAL_ROLE}
      })
    }
  }),
  {
    title: ({l}) => l('titles.USER_MANAGE_TITLE'),
    onlySigned: true
  }
)
