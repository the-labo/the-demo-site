/**
 * CautionDisconnectedDialog component
 */
'use strict'

import React from 'react'
import { compose, asBound, withLoc } from '../../wrappers'
import { TheDialog, TheButton, TheButtonGroup, TheIcon } from 'the-components'
import { Icons } from '@self/conf'

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
                 title={(
                   <span><TheIcon className={Icons.WARNING_ICON}/>{l('titles.CAUTION_DISCONNECTED_TITLE')}</span>
                 )}
                 lead={l('messages.CONNECTION_SEEMS_TO_BE_LOST')}
      >

        <br/>
        <TheButtonGroup>
          <TheButton onClick={onReload}
                     icon={Icons.RELOAD_ICON}
          >
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
