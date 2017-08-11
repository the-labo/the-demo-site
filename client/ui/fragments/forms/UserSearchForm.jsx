/**
 * UseSearchForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton, TheButtonGroup } from 'the-components'
import { asForm } from '../../wrappers'
import { RoleCodes } from '@self/conf'

const {Text, Password, Radio} = TheInput
const {FieldRoleCodes, Label, Value} = TheForm

const UseSearchForm = ({
                         l,
                         onSubmit,
                         getInputAttributesOf,
                         getLabelAttributesOf,
                         getFormAttributes,
                         getSubmitAttributes
                       }) => (
  <TheForm className='userSearchForm primaryForm'
           inline
           {...getFormAttributes()}
           required={['name']}
           autoComplete='off'
  >
    <Text placeholder={l('placeholders.USER_SEARCH')}
          autoFocus
          onEnter={onSubmit}
          {...getInputAttributesOf('q')}/>
    <TheButton primary {...getSubmitAttributes()}>
      {l('buttons.DO_SEARCH')}
    </TheButton>
  </TheForm>
)

export default asForm(UseSearchForm)
