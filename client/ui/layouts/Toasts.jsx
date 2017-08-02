/**
 * Toasts component
 */
'use strict'

import React from 'react'
import { TheToastGroup, TheToast } from 'the-components'
import { connect, withStore } from 'the-store'
import { UI } from '@self/conf'

const { TOAST_DURATION } = UI

const Toasts = ({ info, warn, error, store }) => {
  const { toast } = store
  return (
    <TheToastGroup className='main'>
      <TheToast.Info onUpdate={({ info }) => toast.info.reset(info)} messages={info} clearAfter={TOAST_DURATION}/>
      <TheToast.Warn onUpdate={({ warn }) => toast.warn.reset(warn)} messages={warn} clearAfter={TOAST_DURATION}/>
      <TheToast.Error onUpdate={({ error }) => toast.error.reset(error)} messages={error} clearAfter={TOAST_DURATION}/>
    </TheToastGroup>
  )
}

export default connect(
  (state) => ({
    info: state[ 'toast.info' ],
    warn: state[ 'toast.warn' ],
    error: state[ 'toast.error' ]
  })
)(
  withStore(Toasts)
)
