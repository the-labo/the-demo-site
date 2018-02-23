/**
 * RecoverSendForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { withForm } from 'the-components'
import { TheRecoverSendForm } from 'the-site-components'

@withForm
@localized
class RecoverSendForm extends React.Component {
  render () {
    return (
      <TheRecoverSendForm {...this.props}/>
    )
  }
}

export default stateful(
  (state) => ({
    errors: state['recover.send.entryErrors'],
    spinning: state['recover.send.busy'],
    values: state['recover.send.entry'],
  }),
  ({
     l,
     recoverSendScene: sendScene,
     toastScene,
   }) => ({
    onSubmit: async () => {
      await sendScene.doExec()
      sendScene.set({done: true})
      await toastScene.showInfo(l('toasts.RECOVER_EMAIL_SENT'))
    },
    onUpdate: (v) => sendScene.setEntry(v),
  })
)(RecoverSendForm)
