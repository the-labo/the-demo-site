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
    spinning: state['signIn.busy'],
    values: state['signIn.entry'],
    errors: state['signIn.entryErrors']
  }),
  ({
     l,
     accountScene,
     signInScene,
     toastScene
   }) => ({
    onUpdate: (v) => signInScene.setEntry(v),
    onSubmit: async () => {
      await signInScene.doSignIn()
      await accountScene.doSync()
      toastScene.showInfo(l('toasts.SIGNIN_DID_SUCCESS'))
      signInScene.goBack()
    }
  })
)
