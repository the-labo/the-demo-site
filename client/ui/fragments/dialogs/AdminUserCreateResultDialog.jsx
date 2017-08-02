/**
 * AdminUserCreateResultDialog component
 */
'use strict'

import React from 'react'
import { TheDialog, TheButtonGroup, TheButton } from 'the-components'
import c from 'classnames'

const AdminUserCreateResultDialog = ({l, user, onClose}) => (
  <TheDialog present
             className='admin-user-create-result-dialog'
             title={l('titles.USER_CREATE_RESULT_TITLE')}
             hideCloseButton
  >
    <h5>{l('leads.USER_CREATE_RESULT')}</h5>
    {
      user && (
        <ul className={c('kv')}>
          <li className={c('kv-row')}>
            <span className={c('kv-key')}>{l('labels.USER_NAME')}</span>
            <span className={c('kv-value')}>{user.name}</span>
          </li>
          <li className={c('kv-row')}>
            <span className={c('kv-key')}>{l('labels.USER_PASSWORD')}</span>
            <span className={c('kv-value')}>{user.password}</span>
          </li>
        </ul>
      )
    }
    <br/>
    <TheButtonGroup>
      <TheButton onClick={onClose}>{l('buttons.DO_OK')}</TheButton>
    </TheButtonGroup>
  </TheDialog>
)

export default AdminUserCreateResultDialog
