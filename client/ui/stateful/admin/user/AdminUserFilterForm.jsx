/**
 * AdminUserFilterForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { withForm } from 'the-components'
import { TheSearchForm } from 'the-site-components'

@withForm
@localized
class AdminUserFilterForm extends React.Component {
  render () {
    const {l} = this.props
    return (
      <TheSearchForm {...this.props}
                     placeholder={l('placeholders.USER_SEARCH')}
      />
    )

  }
}

export default stateful(
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
)(AdminUserFilterForm)
