/**
 * AdminUserManageView component
 */
'use strict'

import React from 'react'
import {
  TheView,
  TheCondition
} from 'the-components'
import { asView } from '../../wrappers'
import styles from './AdminUserManageView.pcss'
import {
  AdminUserFilterForm,
  AdminUserActionBar,
  AdminUserPager,
  AdminUserCreateDialog,
  AdminUserDestroyDialog,
  AdminUserPasswordDialog,
  AdminUserList
} from '../../bounds'
import { Icons, Urls } from '@self/conf'
import { RoleCodes } from '@self/conf'

function AdminUserManageView ({
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
                      text={l('titles.ADMIN_USER_MANAGE_TITLE')}
                      rightText={l('buttons.SHOW_USER_CREATE')}
                      onRightClick={onCreate}
      />
      <TheView.Body>
        <div className={styles.searchRow}>
          <AdminUserFilterForm/>
        </div>
        <TheCondition if={ready}>
          <div>
            <AdminUserPager showCounts/>
            <AdminUserList className={styles.list}/>
            <AdminUserPager/>
            <AdminUserActionBar/>
            <AdminUserCreateDialog/>
            <AdminUserDestroyDialog/>
            <AdminUserPasswordDialog/>
          </div>
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  AdminUserManageView,
  (state) => ({
    busy: !state['admin.user.list.ready'] && state['admin.user.list.busy'],
    query: state['app.query'],
    ready: state['admin.user.list.ready'],
  }),
  ({
     adminUserCheckScene,
     adminUserCreateScene,
     adminUserListScene,
     adminUserFilterScene,
   }, ownProps) => ({
    onCreate: () => {
      adminUserCreateScene.init()
      adminUserCreateScene.set({
        active: true,
        entry: {role: RoleCodes.NORMAL_ROLE}
      })
    },
    onMount: async () => {
      adminUserListScene.init()
      adminUserFilterScene.init()
      adminUserCheckScene.init()
      adminUserCreateScene.init()

      const {q = null} = ownProps.query
      adminUserListScene.setQ(q)
      adminUserFilterScene.setEntry({q})

      await adminUserListScene.doSync()
    },
    onTearDown: () => {},
  }),
  {
    title: ({l}) => l('titles.ADMIN_USER_MANAGE_TITLE'),
    onlySigned: true
  }
)
