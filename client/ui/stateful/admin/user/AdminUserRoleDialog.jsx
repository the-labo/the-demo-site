/**
 * AdminUserRoleDialog component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import {
  TheDialog,
} from 'the-components'
import AdminUserRoleForm from './AdminUserRoleForm'

@stateful(
  (state) => ({
    active: state['admin.user.role.active'],
    spinning: state['admin.user.role.busy'],
    users: state['admin.user.role.targets'],
  }),
  ({
     adminUserRoleScene: roleScene,
   }, propsProxy) => ({
    onClose: () => roleScene.set({
      active: false,
      targets: [],
    }),
  })
)
@localized
class AdminUserRoleDialog extends React.Component {
  render () {
    const {
      active,
      l,
      onClose,
      spinning,
      users,
    } = this.props

    if (!active) {
      return null
    }

    return (
      <TheDialog present={active}
                 title={l('titles.ADMIN_USER_ROLE_TITLE')}
                 {...{
                   onClose,
                   spinning,
                 }}
      >
        <AdminUserRoleForm {...{ users }}/>
      </TheDialog>
    )
  }
}

export default AdminUserRoleDialog
