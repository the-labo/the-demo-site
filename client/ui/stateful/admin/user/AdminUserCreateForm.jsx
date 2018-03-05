/**
 * AdminUserCreateForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { formed } from 'the-component-mixins'
import { TheUserCreateForm } from 'the-site-components'
import { withRole } from '../../../wrappers'

@withRole
@formed
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
     adminUserCreateScene: createScene,
     adminUserListScene: listScene,
     l,
     toastScene,
   }) => ({
    onSubmit: async () => {
      await createScene.doExec()
      createScene.set({done: true})
      toastScene.showInfo(l('toasts.USER_CREATE_DID_SUCCESS'))
      await listScene.doSync()
    },
    onUpdate: (v) => createScene.setEntry(v),
  })
)(AdminUserCreateForm)
