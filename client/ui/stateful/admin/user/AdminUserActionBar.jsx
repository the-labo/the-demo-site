/**
 * AdminUserActionBar component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { TheActionBar } from 'the-components'

@stateful(
  (state) => ({
    users: state['admin.user.list.entities'],
    checks: state['admin.user.check.values'],
  }),
  ({
     adminUserDestroyScene: destroyScene,
     adminUserPasswordScene: passwordScene,
     adminUserRoleScene: roleScene,
     l,
   }, propsProxy) => {
    const getTargets = () => propsProxy.users.filter(({id}) => propsProxy.checks[id])
    return {
      getTargets,
      onDestroy: () => {
        destroyScene.set({
          active: true,
          done: false,
          targets: getTargets(),
        })
      },
      onPasswordReset: () => {
        passwordScene.set({
          active: true,
          done: false,
          targets: getTargets(),
        })
      },
      onRoleChange: () => {
        roleScene.set({
          active: true,
          targets: getTargets(),
        })
      },
    }
  }
)
@localized
class AdminUserActionBar extends React.Component {
  render () {
    const {
      getTargets,
      l,
      onDestroy,
      onPasswordReset,
      onRoleChange,
    } = this.props
    const targets = getTargets()
    return (
      <TheActionBar buttons={{
        destroy: l('buttons.SHOW_DESTROY_USERS'),
        passwordReset: l('buttons.SHOW_RESET_PASSWORD'),
        roleChange: l('buttons.SHOW_ROLE_CHANGE'),
      }}
                    danger={{ destroy: true }}
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

export default AdminUserActionBar
