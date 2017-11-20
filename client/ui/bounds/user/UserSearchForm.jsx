/**
 * UseSearchForm component
 */
'use strict'

import React from 'react'
import { withLoc, asBound } from '../../wrappers'
import { RoleCodes } from '@self/conf'
import { SearchForm } from '../../fragments'

const UseSearchForm = withLoc(
  function UseSearchFormImpl (props) {
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
      const {q} = propsProxy.values || {}
      if (q) {
        userListScene.set({filter: {name: {$like: `%${String(q).trim()}%`}}})
      } else {
        userListScene.init('filter')
      }
      await userSearchScene.busyFor(async () => {
        await userListScene.doSync()
      })
    }
  })
)
