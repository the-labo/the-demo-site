/**
 * AdminUserCreateForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { withForm } from 'the-components'
import { TheUserCreateForm } from 'the-site-components'
import { RoleCodes } from '@self/conf'

@withForm
@localized
class AdminUserCreateForm extends React.Component {
  render () {
    const {l} = this.props
    return (
      <TheUserCreateForm {...this.props}
                         roles={{
                           [RoleCodes.ADMIN_ROLE]: l('roleCodes.ADMIN_ROLE'),
                           [RoleCodes.NORMAL_ROLE]: l('roleCodes.NORMAL_ROLE'),
                         }}
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
      toastScene.showInfo(l('toasts.ADMIN_USER_CREATE_DID_SUCCESS'))
      await adminUserListScene.doSync()
    },
    onUpdate: (v) => adminUserCreateScene.setEntry(v),
  })
)(AdminUserCreateForm)
