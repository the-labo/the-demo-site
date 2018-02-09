/**
 * AdminUserFilterForm component
 */
'use strict'

import React from 'react'
import { TheSearchForm } from 'the-site-components'
import { get } from 'the-window'
import { asForm } from '../../../wrappers'

function AdminUserFilterForm (props) {
  const {l} = props
  return (
    <TheSearchForm {...props}
                   placeholder={l('placeholders.USER_SEARCH')}
    />
  )
}

export default asForm(
  AdminUserFilterForm,
  (state) => ({
    errors: state['admin.user.filter.entryErrors'],
    spinning: state['admin.user.filter.busy'],
    values: state['admin.user.filter.entry'],
  }),
  ({
     adminUserFilterScene,
     adminUserListScene,
   }, propsProxy) => ({
    onSubmit: async () => {
      const {q} = propsProxy.values || {}
      adminUserListScene.setQ(q)
      await adminUserFilterScene.busyWhile(async () => {
        await adminUserListScene.doSync()
      })
    },
    onUpdate: (v) => adminUserFilterScene.setEntry(v),
  })
)
