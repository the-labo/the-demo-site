/**
 * RecoverResetForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton } from 'the-components'
import { asForm } from '../../wrappers'

const {Password} = TheInput
const {Field, Label, Value} = TheForm

function RecoverResetForm ({
                             l,
                             getInputAttributesOf,
                             getLabelAttributesOf,
                             getFormAttributes,
                             getSubmitAttributes
                           }) {

  return (
    <TheForm className='recover-reset-form'
             {...getFormAttributes()}
             required={['password']}
    >
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
     toastScene
   }) => ({
    onUpdate: (v) => recoverResetScene.setEntry(v),
    onSubmit: async () => {
      await recoverResetScene.doReset()
      recoverResetScene.set({done: true})
    }
  })
)

