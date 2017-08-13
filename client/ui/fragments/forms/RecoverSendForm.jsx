/**
 * RecoverSendForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton, TheButtonGroup } from 'the-components'
import { asForm } from '../../wrappers'

const {Text} = TheInput

const RecoverSendForm = ({
                           l,
                           onSubmit,
                           getInputAttributesOf,
                           getLabelAttributesOf,
                           getFormAttributes,
                           getSubmitAttributes
                         }) => (
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

export default asForm(RecoverSendForm)
