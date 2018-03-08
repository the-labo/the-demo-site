'use strict'

import React from 'react'
import { isProduction } from 'the-check'
import { history as historyFor, mount } from 'the-entrypoint'
import { get, once, rescue, set } from 'the-window'
import { GlobalKeys, locales, UI } from '@self/conf'
import App from './App'
import client from '../client'
import handle from '../handle'
import store from '../store'

set(GlobalKeys.STAGE, 'registering')

once('DOMContentLoaded', async () => {
  set(GlobalKeys.STAGE, 'mounting')

  const props = get(GlobalKeys.PROPS)
  const {
    lang = (get('navigator.language')).split('-')[0],
  } = props
  const app = (<App {...props} {...{client, handle, store}}/>)
  const l = locales.bind(lang)
  const controllers = await client.useAll({debug: !isProduction()})

  const history = historyFor()
  handle.setAttributes({client, controllers, history, l, lang, store})
  handle.initAll()

  const {appScene, toastScene} = handle
  history.listen((location) => {
    setTimeout(() => appScene.setLocation(location), 0) // Wait to router change
  })
  appScene.set({host: get('location.host'), locale: lang})
  appScene.setLocation(history.location)

  rescue((e) => {
    const handled = appScene.handleRejectionReason(e.reason)
    if (!handled) {
      toastScene.showError(l('errors.UNEXPECTED_ERROR'))
    }
  })

  await mount(app, UI.APP_CONTAINER_ID, {history, router: true})
  console.debug(`The app mounted on "#${UI.APP_CONTAINER_ID}" with props:`, props)

  set(GlobalKeys.STAGE, 'mounted')
  set(GlobalKeys.HANDLE, handle)
  set(GlobalKeys.STORE, store)
})
