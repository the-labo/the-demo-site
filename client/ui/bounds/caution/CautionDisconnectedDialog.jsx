/**
 * CautionDisconnectedDialog component
 */
'use strict'

import { Icons } from '@self/conf'
import React from 'react'
import { asBound, compose } from 'the-hoc'
import { withLoc } from 'the-loc'
import { TheCautionDisconnectedDialog } from 'the-site-components'

const CautionDisconnectedDialog = compose(
  withLoc
)(
  function CautionDisconnectedDialogImpl ({
                                            active,
                                            busy,
                                            l,
                                            onReload,
                                          }) {
    return (
      <TheCautionDisconnectedDialog {...{active, busy, l, onReload}}
                                    reloadIcon={Icons.RELOAD_ICON}
                                    warningIcon={Icons.WARNING_ICON}
      />
    )
  }
)

export default asBound(
  CautionDisconnectedDialog,
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
)
