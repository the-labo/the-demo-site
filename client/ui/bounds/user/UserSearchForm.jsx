/**
 * UserSearchForm component
 */
'use strict'

import React from 'react'
import { asForm } from '../../wrappers'
import { TheSearchForm } from 'the-site-components'
import { get } from 'the-window'

function UserSearchForm (props) {
  const {l} = props
  return (
    <TheSearchForm {...props}
                   placeholder={l('placeholders.USER_SEARCH')}
    />
  )
}

export default asForm(
  UserSearchForm,
  (state) => ({
    errors: state['userSearch.entryErrors'],
    spinning: state['userSearch.busy'],
    values: state['userSearch.entry'],
  }),
  ({
     userListScene,
     userSearchScene,
   }, propsProxy) => ({
    onSubmit: async () => {
      const {q} = propsProxy.values || {}
      userListScene.setQ(q)
      await userSearchScene.busyWhile(async () => {
        await userListScene.doSync()
      })
    },
    onUpdate: (v) => userSearchScene.setEntry(v),
  })
)
