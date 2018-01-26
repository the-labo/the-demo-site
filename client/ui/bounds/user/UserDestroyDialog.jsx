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
                                    active,
                                    done,
                                    l,
                                    onClose,
                                    onSubmit,
                                    spinning,
                                    users,
                                  }) {
    return (
      <TheDestroyDialog title={l('titles.USERS_DESTROY_CONFIRM_TITLE')}
                        lead={l('leads.USER_DESTROY_CONFIRM')}
                        entities={users}
                        renderItem={({displayName}) => displayName}
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
)

export default asBound(
  UserDestroyDialog,
  (state) => ({
    active: state['userDestroy.active'],
    done: state['userDestroy.done'],
    spinning: state['userDestroy.busy'],
    users: state['userDestroy.targets'],
  }),
  ({
     l,
     toastScene,
     userCheckScene,
     userDestroyScene,
     userListScene,
   }, propsProxy) => ({
    onClose: () => userDestroyScene.set({
      active: false,
      done: false,
    }),
    onSubmit: async () => {
      await userDestroyScene.doDestroy()
      userDestroyScene.set({
        active: false,
        done: true,
      })
      userCheckScene.init()
      toastScene.showInfo(l('toasts.USER_DESTROY_DID_SUCCESS'))
      await userListScene.doSync()
    }
  })
)
