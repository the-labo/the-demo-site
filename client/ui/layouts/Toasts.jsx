/**
 * Toasts component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { TheSiteToasts } from 'the-site-components'
import { UI } from '@self/conf'

@stateful(
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
@localized
class Toasts extends React.Component {
  render () {
    const {
      error,
      info,
      onReset,
      warn,
    } = this.props
    return (
      <TheSiteToasts {...{error, info, onReset, warn}}
                     duration={UI.TOAST_DURATION}
      />
    )
  }
}

export default Toasts
