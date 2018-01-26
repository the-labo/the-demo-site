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
                           busy,
                           l,
                           onCreate,
                           ready,
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
    query: state['app.query'],
    ready: state['userList.ready'],
  }),
  ({
     userCheckScene,
     userCreateScene,
     userListScene,
     userSearchScene,
   }, ownProps) => ({
    onCreate: () => {
      userCreateScene.init()
      userCreateScene.set({
        active: true,
        entry: {role: RoleCodes.NORMAL_ROLE}
      })
    },
    onMount: async () => {
      userListScene.init()
      userSearchScene.init()
      userCheckScene.init()
      userCreateScene.init()

      const {q = null} = ownProps.query
      userListScene.setQ(q)
      userSearchScene.setEntry({q})

      await userListScene.doSync()
    },
    onTearDown: () => {},
  }),
  {
    title: ({l}) => l('titles.USER_MANAGE_TITLE'),
    onlySigned: true
  }
)
