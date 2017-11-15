/**
 * RecoverResetForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton } from 'the-components'
import { asForm, asBound } from '../../wrappers'

const {Password} = TheInput
const {Field, Label, Value} = TheForm

const RecoverResetForm = asForm(
  function RecoverResetFormImpl ({
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
)

export default asBound(
  RecoverResetForm,
  (state) => ({
    spinning: state['recover.reset.busy'],
    values: state['recover.reset.entry'],
    errors: state['recover.reset.entryErrors']
  }),
  ({
     l,
     recoverResetScene,
     toastScene
   }) => ({
    onUpdate: (v) => recoverResetScene.setEntry(v),
    onSubmit: async () => {
      await recoverResetScene.doReset()
      recoverResetScene.toggle({done: true})
    }
  })
)

