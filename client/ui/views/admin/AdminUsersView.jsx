/**
 * AdminUsersView component
 */
'use strict'

import React from 'react'
import {
  TheView
} from 'the-components'
import { asView } from '../../wrappers'
import styles from './AdminUsersView.pcss'
import c from 'classnames'
import { AdminUsersScene } from '../../../scenes'
import {
  Pager,
  UserSearchForm,
  ActionBar,
  AdminUserList,
  AdminUserCreateResultDialog,
  AdminUserCreateInputDialog,
  AdminUserDestroyConfirmDialog,
  AdminPasswordResetConfirmDialog,
  AdminPasswordResetResultDialog
} from '../../components'
import { Icons, Urls } from '@self/conf'

class AdminUsersView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
    s.adminUsersScene = new AdminUsersScene(props)
  }

  render () {
    const s = this
    const {props, adminUsersScene} = s
    const {
      l,
      users,
      checks,
      sort,
      counts,
      busy,
      searchValues,
      creatingBusy,
      creatingCreated,
      creatingActive,
      creatingDone,
      creatingValues,
      creatingErrors,
      destroyConfirming,
      destroyBusy,
      passwordResetConfirming,
      passwordResetResulting,
      passwordResetBusy,
      passwordResetNewPasswords
    } = props

    return (
      <TheView className={styles.self}
               spinning={busy}
      >
        <TheView.Header leftTo={Urls.ADMIN_URL}
                        icon={Icons.USERS_ICON}
                        text={l('titles.ADMIN_USERS_TITLE')}
                        rightText={l('buttons.SHOW_USER_CREATE')}
                        onRightClick={() => adminUsersScene.startCreating()}
        />
        <TheView.Body>
          <div className={styles.searchRow}>
            <UserSearchForm className={styles.searchForm}
                            values={searchValues}
                            onUpdate={(v) => adminUsersScene.setSearchValues(v)}
                            onSubmit={() => adminUsersScene.syncList()}
            />
          </div>
          {
            users && (
              <div>
                <Pager.Row>
                  <Pager counts={counts}
                         onChange={({pageNumber}) => adminUsersScene.syncList({pageNumber})}
                  />
                  <Pager.Counter {...{l, counts}}/>
                </Pager.Row>
                <AdminUserList {...{l, counts, checks, sort, users}}
                               onSort={(sort) => adminUsersScene.syncList({sort})}
                               onUpdateCheck={(values) => adminUsersScene.updateChecks(values)}
                />
                <Pager.Row>
                  <Pager counts={counts}
                         onChange={({pageNumber}) => adminUsersScene.syncList({pageNumber})}
                  />
                </Pager.Row>

                <ActionBar lead={l('leads.ACTION_WITH_SELECTED_USERS')}
                           hidden={s.getCheckedIds().length === 0}
                           buttons={{
                             passwordReset: l('buttons.SHOW_RESET_PASSWORD'),
                             destroy: l('buttons.SHOW_DESTROY_USERS')
                           }}
                           danger={['destroy']}
                           handlers={{
                             passwordReset: () => adminUsersScene.togglePasswordResetConfirming(true),
                             destroy: () => adminUsersScene.toggleDestroyConfirming(true)
                           }}
                />
              </div>
            )
          }
          {
            (creatingActive && !creatingDone) && (
              <AdminUserCreateInputDialog
                {...{l}}
                values={creatingValues}
                errors={creatingErrors}
                spinning={creatingBusy}
                onClose={() => adminUsersScene.toggleCreatingActive(false)}
                onUpdate={(values) => adminUsersScene.updateCreatingValues(values)}
                onSubmit={async () => {
                  await adminUsersScene.doCreate()
                  await adminUsersScene.syncList()
                }}
              />
            )
          }
          {
            (creatingActive && creatingDone) && (
              <AdminUserCreateResultDialog
                {...{l}}
                user={creatingCreated}
                onClose={() => {
                  adminUsersScene.toggleCreatingActive(false)
                  adminUsersScene.toggleCreatingDone(false)
                }}
              />
            )
          }
          {
            destroyConfirming && (
              <AdminUserDestroyConfirmDialog
                {...{l}}
                users={s.getCheckedUsers()}
                onClose={() => adminUsersScene.toggleDestroyConfirming(false)}
                onSubmit={() => {
                  adminUsersScene.doDestroy(s.getCheckedIds())
                  adminUsersScene.removeChecks()
                }}
                spinning={destroyBusy}
              />
            )
          }
          {
            passwordResetConfirming && (
              <AdminPasswordResetConfirmDialog
                {...{l}}
                users={s.getCheckedUsers()}
                onNo={() => adminUsersScene.togglePasswordResetConfirming(false)}
                onClose={() => adminUsersScene.togglePasswordResetConfirming(false)}
                onYes={() => adminUsersScene.doPasswordReset(s.getCheckedIds())}
                spinning={passwordResetBusy}
              />
            )
          }
          {
            passwordResetResulting && (
              <AdminPasswordResetResultDialog
                {...{l}}
                users={s.getCheckedUsers()}
                newPasswords={passwordResetNewPasswords}
                onClose={() => {
                  adminUsersScene.togglePasswordResetResulting(false)
                  adminUsersScene.removeChecks()
                }}
              />
            )
          }
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
    const s = this
    const {adminUsersScene} = s
    ;(async () => {
      await adminUsersScene.syncList()
    })()
  }

  componentWillUnmount () {
  }

  getCheckedIds () {
    const s = this
    const {props} = s
    const {checks} = props
    return Object.keys(checks).filter((id) => checks[id])
  }

  getCheckedUsers () {
    const s = this
    const {props} = s
    const {users} = props
    const ids = s.getCheckedIds()
    return users && users.filter((user) => !!~ids.indexOf(user.id))
  }
}

export default asView(AdminUsersView, (state) => ({
  users: state['admin.users.listing.entities'],
  checks: state['admin.users.listing.checks'],
  sort: state['admin.users.listing.sort'],
  counts: state['admin.users.listing.meta'],
  busy: state['admin.users.listing.busy'],
  searchValues: state['admin.users.search.values'],
  creatingBusy: state['admin.users.creating.busy'],
  creatingActive: state['admin.users.creating.active'],
  creatingDone: state['admin.users.creating.done'],
  creatingCreated: state['admin.users.creating.created'],
  creatingValues: state['admin.users.creating.entry.values'],
  creatingErrors: state['admin.users.creating.entry.errors'],
  destroyConfirming: state['admin.users.destroying.confirming'],
  destroyBusy: state['admin.users.destroying.busy'],
  passwordResetConfirming: state['admin.users.passwordReset.confirming'],
  passwordResetResulting: state['admin.users.passwordReset.resulting'],
  passwordResetBusy: state['admin.users.passwordReset.busy'],
  passwordResetNewPasswords: state['admin.users.passwordReset.newPasswords']
}))
