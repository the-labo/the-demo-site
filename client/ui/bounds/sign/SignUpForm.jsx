/**
 * SignUpForm component
 */
'use strict'

import React from 'react'
import { TheSignUpForm } from 'the-site-components'
import { asForm } from '../../wrappers'

function SignUpForm (props) {
  return (
    <TheSignUpForm {...props}
    >
    </TheSignUpForm>
  )
}

export default asForm(
  SignUpForm,
  (state) => ({
    spinning: state['signUp.busy'],
    values: state['signUp.entry'],
    errors: state['signUp.entryErrors'],
  }),
  ({
     l,
     accountScene,
     signUpScene,
     toastScene
   }) => ({
    onUpdate: (v) => signUpScene.setEntry(v),
    onSubmit: async () => {
      await signUpScene.doSignUp()
      await accountScene.doSync()
      toastScene.showInfo(l('toasts.SIGNUP_DID_SUCCESS'))
      signUpScene.goBack()
    }
  })
)
