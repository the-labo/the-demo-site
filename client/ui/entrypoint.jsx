'use strict'
import 'the-polyfill/apply'

import React from 'react'
import { once, get, set, mount, rescue, history as historyFor } from 'the-window'
import App from './App'
import { UI, locales } from '@self/conf'
import client from '../client'
import store from '../store'
import handle from '../handle'

set(UI.APP_STAGE_NAME, 'registering')

once('DOMContentLoaded', () => {
  set(UI.APP_STAGE_NAME, 'mounting')

  const [lang] = (get('appLang') || get('navigator.language') || UI.DEFAULT_LANG).split('-')
  const props = get(UI.APP_PROP_NAME)
  const history = historyFor()
  const app = (<App {...props} {...{store, client, handle}}/>)
  const l = locales.bind(lang)
  handle.setAttributes({store, client, l, lang, history})

  mount(app, UI.APP_CONTAINER_ID, {router: true, history})
    .then(() => {
      console.debug(`The app mounted on "#${UI.APP_CONTAINER_ID}" with props:`, props)
      set(UI.APP_STAGE_NAME, 'mounted')
    })

  rescue((e) => {
    const {appScene, toastScene} = handle
    const handled = appScene.handleRejectionReason(e.reason)
    if (handled) {
      return
    }

    toastScene.showError(l('errors.UNEXPECTED_ERROR'))
  })
})
