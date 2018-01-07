/**
 * RecoverSendForm component
 */
'use strict'

import React from 'react'
import { TheRecoverSendForm } from 'the-site-components'
import { asForm } from '../../wrappers'

function RecoverSendForm (props) {
  return (
    <TheRecoverSendForm {...props}/>
  )
}

export default asForm(
  RecoverSendForm,
  (state) => ({
    spinning: state['recoverSend.busy'],
    values: state['recoverSend.entry'],
    errors: state['recoverSend.entryErrors'],
  }),
  ({
     l,
     recoverSendScene,
     toastScene
   }) => ({
    onUpdate: (v) => recoverSendScene.setEntry(v),
    onSubmit: async () => {
      await recoverSendScene.doSend()
      recoverSendScene.set({done: true})
      await toastScene.showInfo(l('toasts.RECOVER_EMAIL_SENT'))
    }
  })
)
