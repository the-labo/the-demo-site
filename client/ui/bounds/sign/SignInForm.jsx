/**
 * SigninForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton } from 'the-components'
import { asForm, asBound } from '../../wrappers'

const {Text, Password} = TheInput
const {Field, Label, Value} = TheForm

const SigninForm = asForm(
  function SigninFormImpl ({
                             getInputAttributesOf,
                             getLabelAttributesOf,
                             getFormAttributes,
                             getSubmitAttributes,
                             onSubmit,
                             l
                           }) {
    return (
      <TheForm className='signinForm'
               {...getFormAttributes()}
      >
        <TheInput {...getInputAttributesOf('@')}
                  onUpdate={() => null}
                  type='hidden'/>
        <Field>
          <Label {...getLabelAttributesOf('name')}>
            {l('labels.USER_NAME')}
          </Label>
          <Value>
            <Text placeholder={l('placeholders.USER_NAME')}
                  {...getInputAttributesOf('name')}
                  autoFocus
            />
          </Value>
        </Field>
        <Field>
          <Label {...getLabelAttributesOf('password')}>
            {l('labels.USER_PASSWORD')}
          </Label>
          <Value>
            <Password {...getInputAttributesOf('password')}
                      onEnter={onSubmit}
            />
          </Value>
        </Field>
        <Field>
          <TheButton wide primary {...getSubmitAttributes()}>
            {l('buttons.DO_SIGNIN')}
          </TheButton>
        </Field>
      </TheForm>
    )
  }
)

export default asBound(
  SigninForm,
  (state) => ({
    spinning: state['sign.signin.busy'],
    values: state['sign.signin.entry'],
    errors: state['sign.signin.entryErrors']
  }),
  ({
     l,
     accountScene,
     signinScene,
     toastScene
   }) => ({
    onUpdate: (v) => signinScene.setEntry(v),
    onSubmit: async () => {
      await signinScene.doSignIn()
      await accountScene.doSync()
      toastScene.showInfo(l('toasts.SIGNIN_DID_SUCCESS'))
      signinScene.goBack()
    }
  })
)
