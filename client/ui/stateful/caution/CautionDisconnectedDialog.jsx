/**
 * CautionDisconnectedDialog component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { TheCautionDisconnectedDialog } from 'the-site-components'
import { Icons } from '@self/conf'

@localized
class CautionDisconnectedDialog extends React.Component {
  render () {
    const {
      active,
      busy,
      l,
      onReload,
    } = this.props

    return (
      <TheCautionDisconnectedDialog {...{active, busy, l, onReload}}
                                    reloadIcon={Icons.RELOAD_ICON}
                                    warningIcon={Icons.WARNING_ICON}
      />
    )

  }
}

export default stateful(
  (state) => ({
    active: state['caution.disconnected.active'],
    busy: state['caution.disconnected.busy'],
  }),
  ({
     cautionDisconnectedScene,
   }, propsProxy) => ({
    onReload: async () => {
      await cautionDisconnectedScene.doReload()
    },
  })
)(CautionDisconnectedDialog)
