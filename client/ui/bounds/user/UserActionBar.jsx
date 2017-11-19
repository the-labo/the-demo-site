/**
 * UserActionBar component
 */
'use strict'

import React from 'react'
import { TheActionBar } from 'the-components'
import { withLoc } from 'the-loc'
import { asPure, asBound } from '../../wrappers'

const UserActionBar = asPure(withLoc(
  function UserActionBarImpl ({
                                l,
                                targets,
                                onPasswordReset,
                                onDestroy
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
))

export default asBound(
  UserActionBar,
  (state) => ({
    targets: state['user.list.entities'].filter(({id}) => state['user.check.values'][id])
  }),
  ({
     l,
     userPasswordScene,
     userDestroyScene
   }, propsProxy) => ({
    onPasswordReset: () => {
      userPasswordScene.set({
        active: true,
        targets: propsProxy.targets
      })
    },
    onDestroy: () => {
      userDestroyScene.set({
        active: true,
        targets: propsProxy.targets
      })
    }
  })
)
