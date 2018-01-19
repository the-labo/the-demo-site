'use strict'
import React from 'react'
import { once, get, set, mount, rescue, history as historyFor } from 'the-window'
import App from './App'
import { UI, locales } from '@self/conf'
import client from '../client'
import store from '../store'
import handle from '../handle'
import { isProduction } from 'the-check'

set(UI.GLOBAL_KEY_STAGE, 'registering')

once('DOMContentLoaded', async () => {
  set(UI.GLOBAL_KEY_STAGE, 'mounting')

  const props = get(UI.GLOBAL_KEY_PROPS)
  const {
    lang = (get('navigator.language') || UI.DEFAULT_LANG).split('-')[0]
  } = props
  const history = historyFor()
  const app = (<App {...props} {...{store, client, handle}}/>)
  const l = locales.bind(lang)
  const controllers = await client.useAll({debug: !isProduction()})
  handle.setAttributes({store, client, l, lang, history, controllers})

  const {appScene, toastScene} = handle
  history.listen((location) => appScene.setLocation(location))
  appScene.setLocation(history.location)

  rescue((e) => {
    const handled = appScene.handleRejectionReason(e.reason)
    if (!handled) {
      toastScene.showError(l('errors.UNEXPECTED_ERROR'))
    }
  })

  await mount(app, UI.APP_CONTAINER_ID, {router: true, history})
  console.debug(`The app mounted on "#${UI.APP_CONTAINER_ID}" with props:`, props)

  set(UI.GLOBAL_KEY_STAGE, 'mounted')
  set(UI.GLOBAL_KEY_HANDLE, handle)
  set(UI.GLOBAL_KEY_STORE, store)
})
