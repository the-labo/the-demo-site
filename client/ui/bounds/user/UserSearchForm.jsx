/**
 * UserSearchForm component
 */
'use strict'

import React from 'react'
import { asForm } from '../../wrappers'
import { TheSearchForm } from 'the-site-components'

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
    spinning: state['userSearch.busy'],
    values: state['userSearch.entry'],
    errors: state['userSearch.entryErrors']
  }),
  ({
     userSearchScene,
     userListScene
   }, propsProxy) => ({
    onUpdate: (v) => userSearchScene.setEntry(v),
    onSubmit: async () => {
      const {q} = propsProxy.values || {}
      if (q) {
        userListScene.set({
          pageNumber: 1,
          filter: {name: {$like: `%${String(q).trim()}%`}}
        })
      } else {
        userListScene.init('filter')
      }
      await userSearchScene.busyFor(async () => {
        await userListScene.doSync()
      })
    }
  })
)
