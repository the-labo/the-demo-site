/**
 * RecoverResetForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { withForm } from 'the-components'
import { TheRecoverResetForm } from 'the-site-components'

@withForm
@localized
class RecoverResetForm extends React.Component {
  render () {
    return (
      <TheRecoverResetForm {...this.props}/>
    )
  }
}

export default stateful(
  (state) => ({
    errors: state['recover.reset.entryErrors'],
    spinning: state['recover.reset.busy'],
    values: state['recover.reset.entry'],
  }),
  ({
     accountScene,
     l,
     recoverResetScene: resetScene,
     toastScene,
   }) => ({
    onSubmit: async () => {
      await resetScene.doExec()
      await accountScene.doSync()
      resetScene.set({done: true})
    },
    onUpdate: (v) => resetScene.setEntry(v),
  })
)(RecoverResetForm)
