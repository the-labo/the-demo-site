/**
 * CautionDisconnectedDialog component
 */
'use strict'

import React from 'react'
import { compose, asBound, withLoc } from '../../wrappers'
import { TheDialog, TheButton, TheButtonGroup } from 'the-components'

const CautionDisconnectedDialog = compose(
  withLoc
)(
  function CautionDisconnectedDialogImpl ({
                                          l,
                                          active,
                                          busy,
                                          onReload
                                        }) {
    return (
      <TheDialog present={active}
                 spinning={busy}
                 title={l('titles.SERVER_GONE_TITLE')}
                 lead={l('messages.CONNECTION_SEEMS_TO_BE_LOST')}
      >
        <TheButtonGroup>
          <TheButton onClick={onReload}>
            {l('buttons.DO_RELOAD')}
          </TheButton>
        </TheButtonGroup>
      </TheDialog>
    )
  }
)

export default asBound(
  CautionDisconnectedDialog,
  (state) => ({
    active: state['cautionDisconnected.active'],
    busy: state['cautionDisconnected.busy']
  }),
  ({
     cautionDisconnectedScene
   }, propsProxy) => ({
    onReload: async () => {
      cautionDisconnectedScene.doReload()
    }
  })
)
