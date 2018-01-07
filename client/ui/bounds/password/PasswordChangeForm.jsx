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
    user: state['account.user'],
    spinning: state['passwordChange.busy'],
    values: state['passwordChange.entry'],
    errors: state['passwordChange.entryErrors']
  }),
  ({
     l,
     passwordChangeScene,
     toastScene
   }) => ({
    onUpdate: (v) => passwordChangeScene.setEntry(v),
    onSubmit: async () => {
      await passwordChangeScene.doSave()
      passwordChangeScene.set({done: true})
      toastScene.showInfo(l('toasts.PASSWORD_UPDATE_DID_SUCCESS'))
    }
  })
)
