/**
 * PasswordChangeForm component
 */
'use strict'

import React from 'react'
import { ThePasswordChangeForm } from 'the-site-components'
import { asForm } from '../../wrappers'

function PasswordChangeForm (props) {
  return (
    <ThePasswordChangeForm {...props}>
    </ThePasswordChangeForm>
  )
}

export default asForm(
  PasswordChangeForm,
  (state) => ({
    errors: state['passwordChange.entryErrors'],
    spinning: state['passwordChange.busy'],
    user: state['account.user'],
    values: state['passwordChange.entry'],
  }),
  ({
     l,
     passwordChangeScene,
     toastScene
   }) => ({
    onSubmit: async () => {
      await passwordChangeScene.doSave()
      passwordChangeScene.set({done: true})
      toastScene.showInfo(l('toasts.PASSWORD_UPDATE_DID_SUCCESS'))
    },
    onUpdate: (v) => passwordChangeScene.setEntry(v),
  })
)
