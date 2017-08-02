/**
 * AdminPasswordResetResultDialog component
 */
'use strict'

import React from 'react'
import { TheDialog, TheButtonGroup, TheButton } from 'the-components'
import c from 'classnames'
import { textHelper } from '../../../helpers'

const { displayNameForUser } = textHelper

const AdminPasswordResetResultDialog = ({ l, newPasswords = {}, users = [], onClose }) => (
  <TheDialog present
             className='admin-password-reset-result-dialog'
             title={l('titles.USERS_PASSWORD_RESET_RESULT_TITLE')}
             hideCloseButton
  >
    <h5>{l('leads.RESET_PASSWORDS_RESULT')}</h5>
    <ul className={c('kv')}>
      {
        Object.keys(newPasswords).map((id) => (
          <li key={id}
              className={c('kv-row')}>
            <span className={c('kv-key')}>{displayNameForUser(users.find((user) => user.id === id))}</span>
            <span className={c('kv-value')}>{newPasswords[ id ]}</span>
          </li>
        ))
      }
    </ul>
    <br/>
    <TheButtonGroup>
      <TheButton onClick={onClose}>{l('buttons.DO_OK')}</TheButton>
    </TheButtonGroup>
  </TheDialog>
)

export default AdminPasswordResetResultDialog
