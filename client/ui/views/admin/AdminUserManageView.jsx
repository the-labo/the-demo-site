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
  AdminUserFilterForm,
  AdminUserList,
  AdminUserPager,
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
                        leftTo={Urls.ADMIN_URL}
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
     adminUserCheckScene: checkScene,
     adminUserCreateScene: createScene,
     adminUserFilterScene: filterScene,
     adminUserListScene: listScene,
   }, propsProxy) => ({
    onCreate: () => {
      createScene.init()
      createScene.set({
        active: true,
        entry: {role: RoleCodes.NORMAL_ROLE},
      })
    },
    onMount: async () => {
      listScene.init()
      filterScene.init()
      checkScene.init()
      createScene.init()

      const {q = null} = propsProxy.query
      listScene.setQ(q)
      filterScene.setEntry({q})

      await listScene.doSync()
    },
    onTearDown: () => {},
  })
)(AdminUserManageView)
