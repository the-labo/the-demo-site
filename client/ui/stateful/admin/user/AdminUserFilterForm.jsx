/**
 * AdminUserFilterForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { formed } from 'the-component-mixins'
import { TheSearchForm } from 'the-site-components'

@formed
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
     adminUserFilterScene: filterScene,
     adminUserListScene: listScene,
   }, propsProxy) => ({
    onSubmit: async () => {
      const {q} = propsProxy.values || {}
      listScene.setQ(q)
      await filterScene.busyWhile(async () => {
        await listScene.doSync()
      })
    },
    onUpdate: (v) => filterScene.setEntry(v),
  })
)(AdminUserFilterForm)
