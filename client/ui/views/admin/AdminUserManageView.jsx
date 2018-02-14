/**
 * AdminUserManageView component
 */
'use strict'

import React from 'react'
import { cycled, localized, stateful, titled } from 'the-component-mixins'
import {
  TheCondition,
  TheView,
} from 'the-components'
import { RoleCodes } from '@self/conf'
import { Icons, Urls } from '@self/conf'
import styles from './AdminUserManageView.pcss'
import {
  AdminUserActionBar,
  AdminUserCreateDialog,
  AdminUserDestroyDialog,
  AdminUserFilterForm,
  AdminUserList,
  AdminUserPager,
  AdminUserPasswordDialog,
  AdminUserRoleDialog,
} from '../../stateful'
import { onlySigned } from '../../wrappers'

@onlySigned
@cycled
@localized
@titled(({l}) => l('titles.ADMIN_USER_MANAGE_TITLE'))
class AdminUserManageView extends React.Component {
  render () {
    const {
      busy,
      l,
      onBack,
      onCreate,
      ready,
      title,
    } = this.props
    return (
      <TheView className={styles.self}
               spinning={busy}
      >
        <TheView.Header icon={Icons.USERS_ICON}
                        leftIcon={Icons.BACK_ICON}
                        onLeftClick={onBack}
                        onRightClick={onCreate}
                        rightText={l('buttons.SHOW_USER_CREATE')}
                        text={title}
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
              <AdminUserRoleDialog/>
            </div>
          </TheCondition>
        </TheView.Body>
      </TheView>
    )
  }
}

export default stateful(
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
   }, propsProxy) => ({
    onBack: () => propsProxy.popTo(Urls.ADMIN_URL),
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

      const {q = null} = propsProxy.query
      adminUserListScene.setQ(q)
      adminUserFilterScene.setEntry({q})

      await adminUserListScene.doSync()
    },
    onTearDown: () => {},
  })
)(AdminUserManageView)
