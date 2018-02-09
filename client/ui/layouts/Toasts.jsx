/**
 * Toasts component
 */
'use strict'

import React from 'react'
import { asBound, compose } from 'the-hoc'
import { TheSiteToasts } from 'the-site-components'
import { UI } from '@self/conf'

const Toasts = compose(
)(
  function ToastsImpl ({
                         error,
                         info,
                         onReset,
                         warn,
                       }) {
    return (
      <TheSiteToasts {...{error, info, onReset, warn}}
                     duration={UI.TOAST_DURATION}
      />
    )
  }
)

export default asBound(
  Toasts,
  (state) => ({
    error: state['toast.error'],
    info: state['toast.info'],
    warn: state['toast.warn'],
  }),
  ({
     toastScene,
   }) => ({
    onReset: (queues) => toastScene.reset(queues),
  })
)
