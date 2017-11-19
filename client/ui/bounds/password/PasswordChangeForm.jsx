/**
 * PasswordChangeForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton } from 'the-components'
import { asForm, asBound } from '../../wrappers'

const {Password} = TheInput
const {Field, Label, Value} = TheForm

const PasswordChangeForm = asForm(
  function PasswordChangeFormImpl ({
                                     l,
                                     user,
                                     getInputAttributesOf,
                                     getLabelAttributesOf,
                                     getFormAttributes,
                                     getSubmitAttributes
                                   }) {
    return (
      <TheForm className='password-form'
               {...getFormAttributes()}
               required={['name']}
      >
        <Field>
          <Label>
            {l('labels.USER_NAME')}
          </Label>
          <Value>
            {user.name}
          </Value>
        </Field>
        <Field>
          <Label {...getLabelAttributesOf('password')}>
            {l('labels.NEW_PASSWORD')}
          </Label>
          <Value>
            <Password placeholder={l('placeholders.NEW_PASSWORD')}
                      autoFocus
                      {...getInputAttributesOf('password')}/>
          </Value>
        </Field>
        <br/>
        <Field>
          <TheButton wide primary {...getSubmitAttributes()}>
            {l('buttons.DO_UPDATE')}
          </TheButton>
        </Field>
      </TheForm>
    )
  }
)

export default asBound(
  PasswordChangeForm,
  (state) => ({
    user: state['account.user'],
    values: state['password.change.entry'],
    errors: state['password.change.entryErrors']
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
