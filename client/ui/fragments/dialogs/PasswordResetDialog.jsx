/**
 * PasswordResetDialog component
 */
'use strict'

import React from 'react'
import { withLoc } from 'the-loc'
import { TheDialog, TheButton } from 'the-components'

const PasswordResetDialog = withLoc(
  function PasswordResetDialog ({
                                  l,
                                  onClose
                                }) {
    return (
      <TheDialog className='password-reset-dialog'
                 present
                 onClose={onClose}
                 title={l('titles.PASSWORD_RESET_TITLE')}
      >
        <p>
          {l('messages.HOW_TO_PASSWORD_RESET')}
        </p>
        <br/>
        <br/>
        <br/>
        <TheButton wide onClose={onClose}>{l('buttons.DO_OK')}</TheButton>
      </TheDialog>
    )
  }
)

export default PasswordResetDialog
