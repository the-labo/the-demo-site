/**
 * Dialogs component
 */
'use strict'

import React from 'react'
import { stateful } from 'the-component-mixins'
import {
  AdminUserCreateDialog,
  AdminUserDestroyDialog,
  AdminUserPasswordDialog,
  AdminUserRoleDialog,
  ConnectionRetryDialog,
} from '../stateful'

class Dialogs extends React.Component {
  render () {
    return (
      <>
        <ConnectionRetryDialog/>
        <AdminUserCreateDialog/>
        <AdminUserDestroyDialog/>
        <AdminUserPasswordDialog/>
        <AdminUserRoleDialog/>
      </>
    )
  }
}

export default Dialogs
