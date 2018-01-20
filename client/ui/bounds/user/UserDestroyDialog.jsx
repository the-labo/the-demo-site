/**
 * UserDestroyDialog component
 */
'use strict'

import React from 'react'
import { TheDestroyDialog, } from 'the-site-components'
import { withLoc } from 'the-loc'
import { compose, asBound } from 'the-hoc'

const UserDestroyDialog = compose(
  withLoc
)(
  function UserDestroyDialogImpl ({
                                    l,
                                    spinning,
                                    onClose,
                                    onSubmit,
                                    active,
                                    done,
                                    users
                                  }) {
    return (
      <TheDestroyDialog title={l('titles.USERS_DESTROY_CONFIRM_TITLE')}
                        lead={l('leads.USER_DESTROY_CONFIRM')}
                        entities={users}
                        renderItem={({displayName}) => displayName}
                        {...{
                          l,
                          onClose,
                          onSubmit,
                          spinning,
                          active,
                          done,
                        }}
      />
    )
  }
)

export default asBound(
  UserDestroyDialog,
  (state) => ({
    spinning: state['userDestroy.busy'],
    active: state['userDestroy.active'],
    done: state['userDestroy.done'],
    users: state['userDestroy.targets'],
  }),
  ({
     l,
     userDestroyScene,
     userCheckScene,
     userListScene,
     toastScene
   }, propsProxy) => ({
    onClose: () => userDestroyScene.set({
      done: false,
      active: false
    }),
    onSubmit: async () => {
      await userDestroyScene.doDestroy()
      userDestroyScene.set({
        done: true,
        active: false
      })
      userCheckScene.init()
      toastScene.showInfo(l('toasts.USER_DESTROY_DID_SUCCESS'))
      await userListScene.doSync()
    }
  })
)
