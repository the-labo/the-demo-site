/**
 * RecoverSendForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton, TheButtonGroup } from 'the-components'
import { asForm } from '../../wrappers'

const {Text} = TheInput

function RecoverSendForm ({
                            l,
                            onSubmit,
                            getInputAttributesOf,
                            getLabelAttributesOf,
                            getFormAttributes,
                            getSubmitAttributes
                          }) {
  return (
    <TheForm inline
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

export default asForm(
  RecoverSendForm,
  (state) => ({
    spinning: state['recoverSend.busy'],
    values: state['recoverSend.entry'],
    errors: state['recoverSend.entryErrors'],
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
