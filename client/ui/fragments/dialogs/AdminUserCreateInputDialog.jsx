/**
 * AdminUserCreateInputDialog component
 */
'use strict'

import React from 'react'
import { TheDialog } from 'the-components'
import UserCreateForm from '../forms/UserCreateForm'
import c from 'classnames'

const AdminUserCreateInputDialog = ({
                                      l,
                                      onClose,
                                      spinning,
                                      values,
                                      errors,
                                      onUpdate,
                                      onSubmit
                                    }) => (

  <TheDialog className='admin-user-create-input-dialog'
             present
             title={l('titles.USER_CREATE_INPUT_TITLE')}
             {...{spinning, onClose}}
  >

    <br/>
    <UserCreateForm {...{values, errors, onUpdate, onSubmit}}
    />
  </TheDialog>
)

export default AdminUserCreateInputDialog
