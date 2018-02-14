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

    return (
      <TheDialog present={active}
                 title={l('titles.ADMIN_USER_ROLE_TITLE')}
                 {...{
                   onClose,
                   spinning,
                 }}
      >
        <AdminUserRoleForm {...{users}}/>
      </TheDialog>
    )
  }
}

export default stateful(
  (state) => ({
    active: state['admin.user.role.active'],
    spinning: state['admin.user.role.busy'],
    users: state['admin.user.role.targets'],
  }),
  ({
     adminUserCheckScene,
     adminUserRoleScene,
   }, propsProxy) => ({
    onClose: () => adminUserRoleScene.set({
      active: false,
      targets: [],
    }),
  })
)(AdminUserRoleDialog)
