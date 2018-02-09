/**
 * CautionDisconnectedDialog component
 */
'use strict'

import React from 'react'
import { localized } from 'the-component-mixins'
import { asBound, compose } from 'the-hoc'
import { TheCautionDisconnectedDialog } from 'the-site-components'
import { Icons } from '@self/conf'

const CautionDisconnectedDialog = compose(
  localized
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
