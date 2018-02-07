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
                      destroy: l('buttons.SHOW_DESTROY_USERS'),
                      passwordReset: l('buttons.SHOW_RESET_PASSWORD'),
                    }}
                    danger={{destroy: true,}}
                    handlers={{
                      destroy: onDestroy,
                      passwordReset: onPasswordReset,
                    }}
      />
    )
  }
)

export default asBound(
  AdminUserActionBar,
  (state) => ({
    targets: state['admin.user.list.entities'].filter(({id,}) => state['admin.user.check.values'][id]),
  }),
  ({
     adminUserDestroyScene,
     adminUserPasswordScene,
     l,
   }, propsProxy) => ({
    onDestroy: () => {
      adminUserDestroyScene.set({
        active: true,
        targets: propsProxy.targets,
      })
    },
    onPasswordReset: () => {
      adminUserPasswordScene.set({
        active: true,
        targets: propsProxy.targets,
      })
    },
  })
)
