/**
 * AdminUserCreateForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { withForm } from 'the-components'
import { TheUserCreateForm } from 'the-site-components'
import { withRole } from '../../../wrappers'

@withRole
@withForm
@localized
class AdminUserCreateForm extends React.Component {
  render () {
    const {roles} = this.props
    return (
      <TheUserCreateForm {...this.props}
                         roles={roles}
      />
    )
  }
}

export default stateful(
  (state) => ({
    errors: state['admin.user.create.entryErrors'],
    spinning: state['admin.user.create.busy'],
    values: state['admin.user.create.entry'],
  }),
  ({
     adminUserCreateScene,
     adminUserListScene,
     l,
     toastScene,
   }) => ({
    onSubmit: async () => {
      await adminUserCreateScene.doExec()
      adminUserCreateScene.set({done: true})
      toastScene.showInfo(l('toasts.USER_CREATE_DID_SUCCESS'))
      await adminUserListScene.doSync()
    },
    onUpdate: (v) => adminUserCreateScene.setEntry(v),
  })
)(AdminUserCreateForm)
