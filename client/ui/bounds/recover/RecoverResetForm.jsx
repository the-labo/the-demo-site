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
    errors: state['recover.reset.entryErrors'],
    spinning: state['recover.reset.busy'],
    values: state['recover.reset.entry'],
  }),
  ({
     accountScene,
     l,
     recoverResetScene,
     toastScene,
   }) => ({
    onSubmit: async () => {
      await recoverResetScene.doReset()
      await accountScene.doSync()
      recoverResetScene.set({done: true})
    },
    onUpdate: (v) => recoverResetScene.setEntry(v),
  })
)
