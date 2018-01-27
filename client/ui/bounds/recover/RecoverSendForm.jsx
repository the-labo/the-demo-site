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
    errors: state['recover.send.entryErrors'],
    spinning: state['recover.send.busy'],
    values: state['recover.send.entry'],
  }),
  ({
     l,
     recoverSendScene,
     toastScene
   }) => ({
    onSubmit: async () => {
      await recoverSendScene.doSend()
      recoverSendScene.set({done: true})
      await toastScene.showInfo(l('toasts.RECOVER_EMAIL_SENT'))
    },
    onUpdate: (v) => recoverSendScene.setEntry(v),
  })
)
