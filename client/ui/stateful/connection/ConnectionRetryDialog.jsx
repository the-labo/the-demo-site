/**
 * ConnectionRetryDialog component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { TheConnectionRetryDialog } from 'the-site-components'
import { Icons } from '@self/conf'

@stateful(
  (state) => ({
    active: state['connection.retry.active'],
    busy: state['connection.retry.busy'],
  }),
  ({
     connectionRetryScene: retryScene,
   }, propsProxy) => ({
    onClose: () => retryScene.abort(),
    onReload: async () => {
      await retryScene.doExec()
    },
  })
)
@localized
class ConnectionRetryDialog extends React.Component {
  render () {
    const {
      active,
      busy,
      l,
      onClose,
      onReload,
    } = this.props

    return (
      <TheConnectionRetryDialog {...{ active, busy, l, onClose, onReload }}
                                reloadIcon={Icons.RELOAD_ICON}
                                warningIcon={Icons.WARNING_ICON}
      />
    )
  }
}

export default ConnectionRetryDialog
