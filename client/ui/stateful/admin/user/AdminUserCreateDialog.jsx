/**
 * AdminUserCreateDialog component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { TheCreateDialog } from 'the-site-components'
import AdminUserCreateForm from './AdminUserCreateForm'

@stateful(
  (state) => ({
    active: state['admin.user.create.active'],
    created: state['admin.user.create.result'],
    done: state['admin.user.create.done'],
    spinning: state['admin.user.create.busy'],
  }),
  ({
     adminUserCreateScene: createScene,
   }, propsProxy) => ({
    onClose: () => createScene.set({
      active: false,
      done: false,
    }),
  })
)
@localized
class AdminUserCreateDialog extends React.Component {
  render () {
    const {
      active,
      created,
      done,
      l,
      onClose,
      spinning,
    } = this.props

    return (
      <TheCreateDialog {...{active, done, l, onClose, spinning}}
                       doneTitle={l('titles.ADMIN_USER_CREATE_RESULT_TITLE')}
                       result={created && {
                         [l('labels.USER_NAME')]: created.name,
                         [l('labels.USER_PROFILE_NAME')]: created.profile && created.profile.name,
                         [l('labels.USER_EMAIL')]: created.profile && created.profile.email,
                         [l('labels.USER_PASSWORD')]: created.password,
                       }}
                       title={l('titles.ADMIN_USER_CREATE_INPUT_TITLE')}
      >
        <AdminUserCreateForm/>
      </TheCreateDialog>
    )
  }
}

export default AdminUserCreateDialog
