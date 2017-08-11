/**
 * AdminUserDestroyConfirmDialog component
 */
'use strict'

import React from 'react'
import { TheConfirmDialog } from 'the-components'
import c from 'classnames'
import { withText } from '../../wrappers'

const AdminUserDestroyConfirmDialog = withText(
  function AdminUserDestroyConfirmDialog ({
                                            displayNameForUser,
                                            l,
                                            spinning,
                                            users,
                                            onSubmit
                                          }) {
    return (
      <TheConfirmDialog className='admin-user-destroy-confirm-dialog'
                        present
                        title={l('titles.USERS_DESTROY_CONFIRM_TITLE')}
                        checkText={l('checks.SURE_TO_DELETE')}
                        onSubmit={onSubmit}
                        submitText={l('buttons.DO_DELETE')}
                        spinning={spinning}
      >
        <h5>{l('leads.USER_DESTROY_CONFIRM')}</h5>
        <ul className={c('kv')}>
          {
            users.map((user) => (
              <li key={user.id}
                  className={c('kv-row')}>
                <span className={c('kv-key')}>{displayNameForUser(user)}</span>
              </li>
            ))
          }
        </ul>
      </TheConfirmDialog>
    )
  }
)
export default AdminUserDestroyConfirmDialog
