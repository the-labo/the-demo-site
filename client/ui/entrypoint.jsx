'use strict'

import React from 'react'
import { once, get, set, mount, rescue, history as historyFor } from 'the-window'
import App from './App'
import { UI, GlobalKeys, locales } from '@self/conf'
import client from '../client'
import store from '../store'
import handle from '../handle'
import { isProduction } from 'the-check'

set(GlobalKeys.STAGE, 'registering')

once('DOMContentLoaded', async () => {
  set(GlobalKeys.STAGE, 'mounting')

  const props = get(GlobalKeys.PROPS)
  const {
    lang = (get('navigator.language')).split('-')[0]
  } = props
  const history = historyFor()
  // Patch
  {
    const {push} = history
    history.push((to) => {
      console.log('to', to)
      push.call(push, to)
    })
  }
  const app = (<App {...props} {...{client, handle, store,}}/>)
  const l = locales.bind(lang)
  const controllers = await client.useAll({debug: !isProduction()})
  handle.setAttributes({client, controllers, history, l, lang, store,})

  const {appScene, toastScene} = handle
  history.listen((location) => appScene.setLocation(location))
  appScene.set({host: get('location.host'), locale: lang,})
  appScene.setLocation(history.location)

  rescue((e) => {
    const handled = appScene.handleRejectionReason(e.reason)
    if (!handled) {
      toastScene.showError(l('errors.UNEXPECTED_ERROR'))
    }
  })

  await mount(app, UI.APP_CONTAINER_ID, {router: true, history})
  console.debug(`The app mounted on "#${UI.APP_CONTAINER_ID}" with props:`, props)

  set(GlobalKeys.STAGE, 'mounted')
  set(GlobalKeys.HANDLE, handle)
  set(GlobalKeys.STORE, store)
})
