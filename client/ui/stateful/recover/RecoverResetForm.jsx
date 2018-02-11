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
     recoverResetScene,
     toastScene,
   }) => ({
    onSubmit: async () => {
      await recoverResetScene.doExec()
      await accountScene.doSync()
      recoverResetScene.set({done: true})
    },
    onUpdate: (v) => recoverResetScene.setEntry(v),
  })
)(RecoverResetForm)
