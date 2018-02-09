/**
 * AdminUserManageView component
 */
'use strict'

import React from 'react'
import {
  TheCondition,
  TheView,
} from 'the-components'
import { Icons, Urls } from '@self/conf'
import { RoleCodes } from '@self/conf'
import styles from './AdminUserManageView.pcss'
import {
  AdminUserActionBar,
  AdminUserCreateDialog,
  AdminUserDestroyDialog,
  AdminUserFilterForm,
  AdminUserList,
  AdminUserPager,
  AdminUserPasswordDialog,
} from '../../bounds'
import { asView } from '../../wrappers'

function AdminUserManageView ({
                                busy,
                                l,
                                onCreate,
                                pop,
                                ready,
                              }) {
  return (
    <TheView className={styles.self}
             spinning={busy}
    >
      <TheView.Header icon={Icons.USERS_ICON}
                      leftIcon={Icons.BACK_ICON}
                      onLeftClick={pop}
                      onRightClick={onCreate}
                      rightText={l('buttons.SHOW_USER_CREATE')}
                      text={l('titles.ADMIN_USER_MANAGE_TITLE')}
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
     adminUserFilterScene,
     adminUserListScene,
   }, ownProps) => ({
    onCreate: () => {
      adminUserCreateScene.init()
      adminUserCreateScene.set({
        active: true,
        entry: {role: RoleCodes.NORMAL_ROLE},
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
    onlySigned: true,
    title: ({l}) => l('titles.ADMIN_USER_MANAGE_TITLE'),
  }
)
