/**
 * AdminUserPasswordDialog component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import {
  TheOperationDialog,
} from 'the-site-components'

@localized
class AdminUserPasswordDialog extends React.Component {
  render () {
    const {
      active,
      done,
      l,
      onClose,
      onYes,
      passwords,
      spinning,
      users,
    } = this.props

    return (
      <TheOperationDialog doneLead={l('leads.RESET_PASSWORDS_RESULT')}
                          doneTitle={l('titles.ADMIN_USER_PASSWORD_RESET_RESULT_TITLE')}
                          entities={users}
                          lead={l('leads.RESET_PASSWORDS_CONFIRM')}
                          renderItem={(user) => user.displayName}
                          result={passwords && users
                            .reduce((data, user) => Object.assign(data, {
                              [user.displayName]: passwords[user.id],
                            }), {})
                          }
                          title={l('titles.ADMIN_USER_PASSWORD_RESET_CONFIRM_TITLE')}
                          {...{
                            active,
                            done,
                            l,
                            onClose,
                            onYes,
                            spinning,
                          }}
      />
    )
  }
}

export default stateful(
  (state) => ({
    active: state['admin.user.password.active'],
    done: state['admin.user.password.done'],
    passwords: state['admin.user.password.result'],
    spinning: state['admin.user.password.busy'],
    users: state['admin.user.password.targets'],
  }),
  ({
     adminUserCheckScene,
     adminUserPasswordScene,
   }, propsProxy) => ({
    onClose: () => adminUserPasswordScene.set({
      active: false,
      done: false,
      targets: [],
    }),
    onYes: async () => {
      await adminUserPasswordScene.doExec()
      adminUserPasswordScene.set({done: true})
      adminUserCheckScene.init()
    },
  })
)(AdminUserPasswordDialog)
