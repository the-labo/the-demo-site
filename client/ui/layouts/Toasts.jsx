/**
 * Toasts component
 */
'use strict'

import React from 'react'
import { TheSiteToasts } from 'the-site-components'
import { UI } from '@self/conf'
import { compose, asBound, } from 'the-hoc'

const Toasts = compose(
)(
  function ToastsImpl ({
                         info,
                         warn,
                         error,
                         onReset,
                       }) {
    return (
      <TheSiteToasts {...{info, warn, error, onReset}}
                     duration={UI.TOAST_DURATION}
      />
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
