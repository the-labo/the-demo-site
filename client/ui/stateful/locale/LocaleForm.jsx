/**
 * LocaleForm component
 */
'use strict'

import React from 'react'
import { localized, stateful } from 'the-component-mixins'
import { withForm } from 'the-components'
import { TheLocaleForm } from 'the-site-components'
import { LocaleNames } from '@self/conf'
import styles from './LocaleForm.pcss'

@localized
@withForm
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

export default stateful(
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
      await appScene.doReload()
    },

  })
)(LocaleForm)
