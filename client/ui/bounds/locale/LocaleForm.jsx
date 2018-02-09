/**
 * LocaleForm component
 */
'use strict'

import { LocaleNames } from '@self/conf'
import React from 'react'
import { compose } from 'the-hoc'
import { TheLocaleForm } from 'the-site-components'
import styles from './LocaleForm.pcss'
import { asForm } from '../../wrappers'

const LocaleForm = compose(

)(
  function LocaleFormImpl (props) {
    return (
      <TheLocaleForm {...props}
                     className={styles.self}
                     options={LocaleNames}
      />
    )
  }
)

export default asForm(
  LocaleForm,
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
)
