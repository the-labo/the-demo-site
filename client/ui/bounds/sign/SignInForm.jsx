/**
 * SignInForm component
 */
'use strict'

import React from 'react'
import { TheSignInForm } from 'the-site-components'
import { asForm } from '../../wrappers'

function SignInForm (props) {
  return (
    <TheSignInForm  {...props}/>
  )
}

export default asForm(
  SignInForm,
  (state) => ({
    errors: state['sign.in.entryErrors'],
    spinning: state['sign.in.busy'],
    values: state['sign.in.entry'],
  }),
  ({
     accountScene,
     l,
     signInScene,
     toastScene,
   }) => ({
    onSubmit: async () => {
      await signInScene.doSignIn()
      await accountScene.doSync()
      toastScene.showInfo(l('toasts.SIGNIN_DID_SUCCESS'))
      signInScene.goBack()
    },
    onUpdate: (v) => signInScene.setEntry(v),
  })
)
