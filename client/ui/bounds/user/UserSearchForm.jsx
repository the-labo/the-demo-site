/**
 * UserSearchForm component
 */
'use strict'

import React from 'react'
import { withLoc, asBound } from '../../wrappers'
import { RoleCodes } from '@self/conf'
import { SearchForm } from '../../fragments'

const UserSearchForm = withLoc(
  function UserSearchFormImpl (props) {
    const {l} = props
    return (
      <SearchForm {...props}
                  placeholder={l('placeholders.USER_SEARCH')}
                  name={'q'}
      />
    )
  }
)

export default asBound(
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
