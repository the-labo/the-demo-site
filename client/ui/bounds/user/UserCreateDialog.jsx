/**
 * UserCreateDialog component
 */
'use strict'

import React from 'react'
import { withLoc } from 'the-loc'
import { TheCreateDialog, } from 'the-site-components'
import UserCreateForm from './UserCreateForm'
import { compose, asBound } from 'the-hoc'

const UserCreateDialog = compose(
  withLoc,
)(
  function UserCreateDialogImpl ({
                                   active,
                                   created,
                                   done,
                                   l,
                                   onClose,
                                   spinning,
                                 }) {

    return (
      <TheCreateDialog {...{active, done, l, onClose, spinning,}}
                       title={l('titles.USER_CREATE_INPUT_TITLE')}
                       doneTitle={l('titles.USER_CREATE_RESULT_TITLE')}
                       result={created && {
                         [l('labels.USER_NAME')]: created.name,
                         [l('labels.USER_PROFILE_NAME')]: created.profile?.name,
                         [l('labels.USER_EMAIL')]: created.profile?.email,
                         [l('labels.USER_PASSWORD')]: created.password
                       }}
      >
        <UserCreateForm/>
      </TheCreateDialog>
    )
  }
)

export default asBound(
  UserCreateDialog,
  (state) => ({
    active: state['userCreate.active'],
    created: state['userCreate.result'],
    done: state['userCreate.done'],
    spinning: state['userCreate.busy'],
  }),
  ({userCreateScene}, propsProxy) => ({
    onClose: () => userCreateScene.set({
      active: false,
      done: false
    })
  })
)
