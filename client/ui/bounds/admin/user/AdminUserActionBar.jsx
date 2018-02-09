/**
 * AdminUserActionBar component
 */
'use strict'

import React from 'react'
import { TheActionBar } from 'the-components'
import { asBound, asPure, compose } from 'the-hoc'
import { withLoc } from 'the-loc'

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
      <TheActionBar buttons={{
                      destroy: l('buttons.SHOW_DESTROY_USERS'),
                      passwordReset: l('buttons.SHOW_RESET_PASSWORD'),
                    }}
                    danger={{destroy: true}}
                    handlers={{
                      destroy: onDestroy,
                      passwordReset: onPasswordReset,
                    }}
                    hidden={targets.length === 0}
      />
    )
  }
)

export default asBound(
  AdminUserActionBar,
  (state) => ({
    targets: state['admin.user.list.entities'].filter(({id}) => state['admin.user.check.values'][id]),
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
