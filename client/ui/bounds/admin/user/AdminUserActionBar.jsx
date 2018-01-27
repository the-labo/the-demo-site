/**
 * AdminUserActionBar component
 */
'use strict'

import React from 'react'
import { TheActionBar } from 'the-components'
import { withLoc } from 'the-loc'
import { asPure, asBound, compose } from 'the-hoc'

const AdminUserActionBar = compose(
  asPure,
  withLoc,
)(
  function AdminUserActionBarImpl ({
                                l,
                                onDestroy,
                                onPasswordReset,
                                targets,
                              }) {
    return (
      <TheActionBar hidden={targets.length === 0}
                    buttons={{
                      passwordReset: l('buttons.SHOW_RESET_PASSWORD'),
                      destroy: l('buttons.SHOW_DESTROY_USERS')
                    }}
                    danger={{destroy: true}}
                    handlers={{
                      passwordReset: onPasswordReset,
                      destroy: onDestroy
                    }}
      />
    )
  }
)

export default asBound(
  AdminUserActionBar,
  (state) => ({
    targets: state['admin.user.list.entities'].filter(({id}) => state['admin.user.check.values'][id])
  }),
  ({
     adminUserDestroyScene,
     adminUserPasswordScene,
     l,
   }, propsProxy) => ({
    onDestroy: () => {
      adminUserDestroyScene.set({
        active: true,
        targets: propsProxy.targets
      })
    },
    onPasswordReset: () => {
      adminUserPasswordScene.set({
        active: true,
        targets: propsProxy.targets
      })
    },
  })
)
