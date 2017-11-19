/**
 * RecoverSendForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton, TheButtonGroup } from 'the-components'
import { asForm, asBound } from '../../wrappers'

const {Text} = TheInput

const RecoverSendForm = asForm(
  function RecoverSendFormImpl ({
                                  l,
                                  onSubmit,
                                  getInputAttributesOf,
                                  getLabelAttributesOf,
                                  getFormAttributes,
                                  getSubmitAttributes
                                }) {
    return (
      <TheForm className='recover-form'
               inline
               {...getFormAttributes()}
               required={['email']}
               autoComplete='off'
      >
        <Text placeholder={l('placeholders.USER_EMAIL')}
              autoFocus
              onEnter={onSubmit}
              {...getInputAttributesOf('email')}/>
        <TheButton primary {...getSubmitAttributes()}>
          {l('buttons.DO_SEND')}
        </TheButton>
      </TheForm>
    )
  }
)

export default asBound(
  RecoverSendForm,
  (state) => ({
    spinning: state['recover.send.busy'],
    values: state['recover.send.entry'],
    errors: state['recover.send.entryErrors'],
  }),
  ({
     l,
     recoverSendScene,
     toastScene
   }) => ({
    onUpdate: (v) => recoverSendScene.setEntry(v),
    onSubmit: async () => {
      await recoverSendScene.doSend()
      recoverSendScene.set({done: true})
      await toastScene.showInfo(l('toasts.RECOVER_EMAIL_SENT'))
    }
  })
)
