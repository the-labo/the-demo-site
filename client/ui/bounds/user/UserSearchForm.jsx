/**
 * UseSearchForm component
 */
'use strict'

import React from 'react'
import { TheForm, TheInput, TheButton, TheButtonGroup } from 'the-components'
import { asForm, asBound } from '../../wrappers'
import { RoleCodes } from '@self/conf'

const {Text, Password, Radio} = TheInput

const UseSearchForm = asForm(
  function UseSearchFormImpl ({
                                l,
                                onSubmit,
                                getInputAttributesOf,
                                getLabelAttributesOf,
                                getFormAttributes,
                                getSubmitAttributes
                              }) {
    return (
      <TheForm className='user-search-form'
               inline
               {...getFormAttributes()}
               required={['q']}
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
  }
)

export default asBound(
  UseSearchForm,
  (state) => ({
    spinning: state['user.search.busy'],
    values: state['user.search.entry'],
    errors: state['user.search.entryErrors']
  }),
  ({
     userSearchScene,
     userListScene
   }, propsProxy) => ({
    onUpdate: (v) => userSearchScene.setEntry(v),
    onSubmit: async () => {
      const {q} = propsProxy.value || {}
      userListScene.set({
        filter: {name: {$like: `%${String(q).trim()}%`}}
      })
      await userListScene.syncList()
    }
  })
)
