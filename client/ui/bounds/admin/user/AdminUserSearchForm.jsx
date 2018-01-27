/**
 * AdminUserSearchForm component
 */
'use strict'

import React from 'react'
import { asForm } from '../../../wrappers'
import { TheSearchForm } from 'the-site-components'
import { get } from 'the-window'

function AdminUserSearchForm (props) {
  const {l} = props
  return (
    <TheSearchForm {...props}
                   placeholder={l('placeholders.USER_SEARCH')}
    />
  )
}

export default asForm(
  AdminUserSearchForm,
  (state) => ({
    errors: state['admin.user.search.entryErrors'],
    spinning: state['admin.user.search.busy'],
    values: state['admin.user.search.entry'],
  }),
  ({
     adminUserListScene,
     adminUserSearchScene,
   }, propsProxy) => ({
    onSubmit: async () => {
      const {q} = propsProxy.values || {}
      adminUserListScene.setQ(q)
      await adminUserSearchScene.busyWhile(async () => {
        await adminUserListScene.doSync()
      })
    },
    onUpdate: (v) => adminUserSearchScene.setEntry(v),
  })
)
