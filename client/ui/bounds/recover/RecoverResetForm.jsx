/**
 * RecoverResetForm component
 */
'use strict'

import React from 'react'
import { TheRecoverResetForm } from 'the-site-components'
import { asForm } from '../../wrappers'

function RecoverResetForm (props) {

  return (
    <TheRecoverResetForm {...props}/>
  )
}

export default asForm(
  RecoverResetForm,
  (state) => ({
    spinning: state['recoverReset.busy'],
    values: state['recoverReset.entry'],
    errors: state['recoverReset.entryErrors']
  }),
  ({
     l,
     recoverResetScene,
     accountScene,
     toastScene
   }) => ({
    onUpdate: (v) => recoverResetScene.setEntry(v),
    onSubmit: async () => {
      await recoverResetScene.doReset()
      await accountScene.doSync()
      recoverResetScene.set({done: true})
    }
  })
)

