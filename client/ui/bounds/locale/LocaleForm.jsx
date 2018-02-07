/**
 * LocaleForm component
 */
'use strict'

import React from 'react'
import { compose, } from 'the-hoc'
import { asForm } from '../../wrappers'
import { LocaleNames } from '@self/conf'
import { TheLocaleForm } from 'the-site-components'
import styles from './LocaleForm.pcss'

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
