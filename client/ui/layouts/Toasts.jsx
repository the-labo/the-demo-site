/**
 * Toasts component
 */
'use strict'

import React from 'react'
import { TheToastGroup, TheToast } from 'the-components'
import { UI } from '@self/conf'
import { asPure, compose, asBound, } from 'the-hoc'

const Toasts = compose(
  asPure,
)(
  function ToastsImpl ({
                         info,
                         warn,
                         error,
                         onReset,
                         duration,
                       }) {
    return (
      <TheToastGroup>
        <TheToast.Info onUpdate={onReset} messages={info} clearAfter={duration}/>
        <TheToast.Warn onUpdate={onReset} messages={warn} clearAfter={duration}/>
        <TheToast.Error onUpdate={onReset} messages={error} clearAfter={duration}/>
      </TheToastGroup>
    )
  }
)

export default asBound(
  Toasts,
  (state) => ({
    duration: UI.TOAST_DURATION,
    info: state['toast.info'],
    warn: state['toast.warn'],
    error: state['toast.error']
  }),
  ({
     toastScene
   }) => ({
    onReset: (queues) => toastScene.reset(queues)
  })
)
