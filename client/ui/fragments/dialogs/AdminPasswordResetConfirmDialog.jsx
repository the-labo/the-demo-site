/**
 * AdminPasswordResetConfirmDialog component
 */
'use strict'

import React from 'react'
import { TheYesNoDialog } from 'the-components'
import c from 'classnames'

const AdminPasswordResetConfirmDialog = ({ l, onYes, onNo, onClose, spinning, users }) => (
  <TheYesNoDialog present
                  className='admin-password-reset-confirm-dialog'
                  spinning={spinning}
                  title={l('titles.USERS_PASSWORD_RESET_CONFIRM_TITLE')}
                  yesText={l('buttons.DO_EXECUTE')}
                  noText={l('buttons.DO_CANCEL')}
                  {...{ onYes, onNo, onClose }}
  >
    <h5>{l('leads.RESET_PASSWORDS_CONFIRM')}</h5>
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
  </TheYesNoDialog>
)

export default AdminPasswordResetConfirmDialog
