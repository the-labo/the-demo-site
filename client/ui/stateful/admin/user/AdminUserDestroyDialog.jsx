/**
 * AdminUserDestroyDialog component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { TheDestroyDialog } from 'the-site-components'

@localized
class AdminUserDestroyDialog extends React.Component {
  render () {
    const {
      active,
      done,
      l,
      onClose,
      onSubmit,
      spinning,
      users,
    } = this.props

    return (
      <TheDestroyDialog entities={users}
                        lead={l('leads.ADMIN_USER_DESTROY_CONFIRM')}
                        renderItem={({displayName}) => displayName}
                        title={l('titles.ADMIN_USER_DESTROY_CONFIRM_TITLE')}
                        {...{
                          active,
                          done,
                          l,
                          onClose,
                          onSubmit,
                          spinning,
                        }}
      />
    )

  }
}

export default stateful(
  (state) => ({
    active: state['admin.user.destroy.active'],
    done: state['admin.user.destroy.done'],
    spinning: state['admin.user.destroy.busy'],
    users: state['admin.user.destroy.targets'],
  }),
  ({
     adminUserCheckScene,
     adminUserDestroyScene,
     adminUserListScene,
     l,
     toastScene,
   }, propsProxy) => ({
    onClose: () => adminUserDestroyScene.set({
      active: false,
      done: false,
    }),
    onSubmit: async () => {
      await adminUserDestroyScene.doDestroy()
      adminUserDestroyScene.set({
        active: false,
        done: true,
      })
      adminUserCheckScene.init()
      toastScene.showInfo(l('toasts.USER_DESTROY_DID_SUCCESS'))
      await adminUserListScene.doSync()
    },
  })
)(AdminUserDestroyDialog)
