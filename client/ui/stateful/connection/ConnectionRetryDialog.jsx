/**
 * ConnectionRetryDialog component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { TheConnectionRetryDialog } from 'the-site-components'
import { Icons } from '@self/conf'

@localized
class ConnectionRetryDialog extends React.Component {
  render () {
    const {
      active,
      busy,
      l,
      onReload,
    } = this.props

    return (
      <TheConnectionRetryDialog {...{active, busy, l, onReload}}
                                reloadIcon={Icons.RELOAD_ICON}
                                warningIcon={Icons.WARNING_ICON}
      />
    )
  }
}

export default stateful(
  (state) => ({
    active: state['connection.retry.active'],
    busy: state['connection.retry.busy'],
  }),
  ({
     connectionRetryScene: retryScene,
   }, propsProxy) => ({
    onReload: async () => {
      await retryScene.doExec()
    },
  })
)(ConnectionRetryDialog)
