/**
 * AdminUserActionBar component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { TheActionBar } from 'the-components'

@localized
class AdminUserActionBar extends React.Component {
  render () {
    const {
      l,
      onDestroy,
      onPasswordReset,
      onRoleChange,
      targets,
    } = this.props

    return (
      <TheActionBar buttons={{
        destroy: l('buttons.SHOW_DESTROY_USERS'),
        passwordReset: l('buttons.SHOW_RESET_PASSWORD'),
        roleChange: l('buttons.SHOW_ROLE_CHANGE'),
      }}
                    danger={{destroy: true}}
                    handlers={{
                      destroy: onDestroy,
                      passwordReset: onPasswordReset,
                      roleChange: onRoleChange,
                    }}
                    hidden={targets.length === 0}
      />
    )
  }
}

export default stateful(
  (state) => ({
    targets: state['admin.user.list.entities'].filter(({id}) => state['admin.user.check.values'][id]),
  }),
  ({
     adminUserDestroyScene,
     adminUserPasswordScene,
     adminUserRoleScene,
     l,
   }, propsProxy) => ({
    onDestroy: () => {
      adminUserDestroyScene.set({
        active: true,
        done: false,
        targets: propsProxy.targets,
      })
    },
    onPasswordReset: () => {
      adminUserPasswordScene.set({
        active: true,
        done: false,
        targets: propsProxy.targets,
      })
    },
    onRoleChange: () => {
      adminUserRoleScene.set({
        active: true,
        targets: propsProxy.targets,
      })
    },
  })
)(AdminUserActionBar)
