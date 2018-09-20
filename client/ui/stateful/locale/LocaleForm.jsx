/**
 * LocaleForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { formed } from 'the-component-mixins'
import { TheLocaleForm } from 'the-site-components'
import { LocaleNames } from '@self/conf'
import styles from './LocaleForm.pcss'

@stateful(
  (state) => ({
    spinning: state['app.busy'],
    value: state['app.locale'],
  }),
  ({
     appScene,
   }, propsProxy) => ({
    onUpdate: async ({locale}) => {
      appScene.set({locale})
      appScene.applyLocaleToSearch()
      await appScene.doExec()
    },

  })
)
@localized
@formed
class LocaleForm extends React.Component {
  render () {
    const props = this.props

    return (
      <TheLocaleForm {...props}
                     className={styles.self}
                     options={LocaleNames}
      />
    )
  }
}

export default LocaleForm
