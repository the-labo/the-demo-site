/**
 * Toasts component
 */
'use strict'

import React from 'react'
import { TheToastGroup, TheToast } from 'the-components'
import { connect, withStore } from 'the-store'
import { UI } from '@self/conf'
import { asPure, asBound, compose } from '../wrappers'

const {TOAST_DURATION} = UI

const Toasts = compose(
  asPure
)(
  function ToastsImpl ({
                         info,
                         warn,
                         error,
                         onReset
                       }) {
    return (
      <TheToastGroup className='main'>
        <TheToast.Info onUpdate={onReset} messages={info} clearAfter={TOAST_DURATION}/>
        <TheToast.Warn onUpdate={onReset} messages={warn} clearAfter={TOAST_DURATION}/>
        <TheToast.Error onUpdate={onReset} messages={error} clearAfter={TOAST_DURATION}/>
      </TheToastGroup>
    )
  }
)

export default asBound(
  Toasts,
  (state) => ({
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
