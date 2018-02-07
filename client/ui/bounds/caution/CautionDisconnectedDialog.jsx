/**
 * CautionDisconnectedDialog component
 */
'use strict'

import React from 'react'
import { withLoc } from 'the-loc'
import { compose, asBound } from 'the-hoc'
import { TheCautionDisconnectedDialog } from 'the-site-components'
import { Icons } from '@self/conf'

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
                                    warningIcon={Icons.WARNING_ICON}
                                    reloadIcon={Icons.RELOAD_ICON}
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
