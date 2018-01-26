/**
 * UserActionBar component
 */
'use strict'

import React from 'react'
import { TheActionBar } from 'the-components'
import { withLoc } from 'the-loc'
import { asPure, asBound, compose } from 'the-hoc'

const UserActionBar = compose(
  asPure,
  withLoc,
)(
  function UserActionBarImpl ({
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
  UserActionBar,
  (state) => ({
    targets: state['userList.entities'].filter(({id}) => state['userCheck.values'][id])
  }),
  ({
     l,
     userDestroyScene,
     userPasswordScene,
   }, propsProxy) => ({
    onDestroy: () => {
      userDestroyScene.set({
        active: true,
        targets: propsProxy.targets
      })
    },
    onPasswordReset: () => {
      userPasswordScene.set({
        active: true,
        targets: propsProxy.targets
      })
    },
  })
)
