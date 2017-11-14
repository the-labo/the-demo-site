/**
 * UserManageView component
 */
'use strict'

import React from 'react'
import {
  TheView,
  TheDialog,
  ThePager,
  TheActionBar,
  TheOkDialog,
  TheConfirmDialog,
  TheYesNoDialog,
  TheInfo,
  TheCondition
} from 'the-components'
import { asView, withText } from '../../wrappers'
import styles from './UserManageView.pcss'
import c from 'classnames'
import { UserManageScene } from '../../../scenes'
import {
  UserSearchForm,
  UserCreateForm,
  UserList
} from '../../bounds'
import { Icons, Urls } from '@self/conf'

function UserManageView ({
                           l,
                           displayNameForUser,
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
                         }) {
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
        <TheCondition if={Boolean(users)}>
          <div>
            <ThePager.Row>
              <ThePager.ByCounts counts={counts}
                                 onUpdate={({pageNumber}) => adminUsersScene.syncList({pageNumber})}
              />
              <ThePager.Counts {...{l, counts}}/>
            </ThePager.Row>
            <UserList {...{l, counts, checks, sort, users}}
                      onSort={(sort) => adminUsersScene.syncList({sort})}
                      onUpdateCheck={(values) => adminUsersScene.updateChecks(values)}
            />
            <ThePager.Row>
              <ThePager.ByCounts counts={counts}
                                 onUpdate={({pageNumber}) => adminUsersScene.syncList({pageNumber})}
              />
            </ThePager.Row>

            <TheActionBar lead={l('leads.ACTION_WITH_SELECTED_USERS')}
                          hidden={s.getCheckedIds().length === 0}
                          buttons={{
                            passwordReset: l('buttons.SHOW_RESET_PASSWORD'),
                            destroy: l('buttons.SHOW_DESTROY_USERS')
                          }}
                          danger={{destroy: true}}
                          handlers={{
                            passwordReset: () => adminUsersScene.togglePasswordResetConfirming(true),
                            destroy: () => adminUsersScene.toggleDestroyConfirming(true)
                          }}
            />
          </div>
        </TheCondition>
        <TheCondition if={Boolean(creatingActive && !creatingDone)}>
          <TheDialog
            present
            title={l('titles.USER_CREATE_INPUT_TITLE')}
            spinning={creatingBusy}
            onClose={() => adminUsersScene.toggleCreatingActive(false)}
          >
            <UserCreateForm/>
          </TheDialog>
        </TheCondition>
        <TheCondition if={Boolean(creatingActive && creatingDone)}>
          <TheOkDialog
            title={l('titles.USER_CREATE_RESULT_TITLE')}
            hideCloseButton
            onClose={() => {
              adminUsersScene.toggleCreatingActive(false)
              adminUsersScene.toggleCreatingDone(false)
            }}
          >
            <TheInfo data={creatingCreated && {
              [l('labels.USER_NAME')]: creatingCreated.name,
              [l('labels.USER_PROFILE_NAME')]: creatingCreated.profile.name,
              [l('labels.USER_EMAIL')]: creatingCreated.profile.email,
              [l('labels.USER_PASSWORD')]: creatingCreated.password
            }}
            />
          </TheOkDialog>
        </TheCondition>
        <TheCondition if={Boolean(destroyConfirming)}>
          <TheConfirmDialog
            onClose={() => adminUsersScene.toggleDestroyConfirming(false)}
            onSubmit={() => {
              adminUsersScene.doDestroy(s.getCheckedIds())
              adminUsersScene.removeChecks()
            }}
            spinning={destroyBusy}
            present
            title={l('titles.USERS_DESTROY_CONFIRM_TITLE')}
            checkText={l('checks.SURE_TO_DESTROY')}
            submitText={l('buttons.DO_DESTROY')}
            lead={l('leads.USER_DESTROY_CONFIRM')}
          >
            <ul>
              {s.getCheckedUsers().map((user) => (
                <li key={user.id}>{displayNameForUser(user)}</li>
              ))}
            </ul>
          </TheConfirmDialog>
        </TheCondition>
        <TheCondition if={Boolean(passwordResetConfirming)}>
          <TheYesNoDialog present
                          className='admin-password-reset-confirm-dialog'
                          title={l('titles.USERS_PASSWORD_RESET_CONFIRM_TITLE')}
                          yesText={l('buttons.DO_EXECUTE')}
                          noText={l('buttons.DO_CANCEL')}
                          lead={l('leads.RESET_PASSWORDS_CONFIRM')}
                          onNo={() => adminUsersScene.togglePasswordResetConfirming(false)}
                          onClose={() => adminUsersScene.togglePasswordResetConfirming(false)}
                          onYes={() => adminUsersScene.doPasswordReset(s.getCheckedIds())}
                          spinning={passwordResetBusy}
          >
            <ul>
              {
                s.getCheckedUsers().map((user) => (
                  <li key={user.id}>{displayNameForUser(user)}</li>
                ))
              }
            </ul>
          </TheYesNoDialog>
        </TheCondition>
        <TheCondition if={Boolean(passwordResetResulting)}>
          <TheOkDialog
            present
            className='admin-password-reset-result-dialog'
            title={l('titles.USERS_PASSWORD_RESET_RESULT_TITLE')}
            lead={l('leads.RESET_PASSWORDS_RESULT')}
            hideCloseButton
            users={s.getCheckedUsers()}
            onClose={() => {
              adminUsersScene.togglePasswordResetResulting(false)
              adminUsersScene.removeChecks()
            }}
          >
            <TheInfo data={
              users
                .filter((user) => !!passwordResetNewPasswords[user.id])
                .reduce((data, user) => Object.assign(data, {
                  [displayNameForUser(user)]: passwordResetNewPasswords[user.id]
                }), {})
            }
            />
          </TheOkDialog>
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default asView(withText(UserManageView), (state) => ({
  users: state['admin.users.listing.entities'],
  checks: state['admin.users.listing.checks'],
  sort: state['admin.users.listing.sort'],
  counts: state['admin.users.listing.meta'],
  busy: state['admin.users.listing.busy'],
  searchValues: state['admin.users.search.values'],
  destroyConfirming: state['admin.users.destroying.confirming'],
  destroyBusy: state['admin.users.destroying.busy'],
  passwordResetConfirming: state['admin.users.passwordReset.confirming'],
  passwordResetResulting: state['admin.users.passwordReset.resulting'],
  passwordResetBusy: state['admin.users.passwordReset.busy'],
  passwordResetNewPasswords: state['admin.users.passwordReset.newPasswords']
}))
