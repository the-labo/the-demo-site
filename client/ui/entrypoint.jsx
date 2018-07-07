'use strict'

import 'the-polyfill/apply'
import React from 'react'
import { isProduction } from 'the-check'
import { history as historyFor, mount, singleton, workers } from 'the-entrypoint'
import { get, once, rescue, set } from 'the-window'
import { GlobalKeys, locales, UI, Urls } from '@self/conf'
import App from './App'
import client from '../client'
import handle from '../handle'
import store from '../store'

singleton()
set(GlobalKeys.STAGE, 'registering')

void async function () {
  await workers({
    '/': Urls.JS_ROOT_SERVICE_WORKER_URL,
  })
}()

once('DOMContentLoaded', async () => {
  set(GlobalKeys.STAGE, 'mounting')

  const props = get(GlobalKeys.PROPS)
  const {
    lang = (get('navigator.language')).split('-')[0] || UI.DEFAULT_LANG,
  } = props
  const app = (<App {...props} {...{client, handle, store}}/>)
  const l = locales.bind(lang)
  const controllers = await client.useAll({debug: !isProduction()})

  const history = historyFor()
  handle.setAttributes({client, controllers, history, l, lang, store})
  handle.initAll()

  const {appScene, toastScene} = handle
  history.listen((location) => appScene.handleLocationChange(location))
  appScene.setLocation(history.location)
  appScene.set({host: get('location.host'), locale: lang})

  rescue((e) => {
    const handled = appScene.handleRejectionReason(e.reason)
    if (!handled) {
      toastScene.showError(l('errors.UNEXPECTED_ERROR'))
    }
  })

  {
    // ブラウザバックが動かない問題への暫定対処
    const window = get('window')
    window.addEventListener('popstate', () => appScene.busyFor(1))
  }

  await mount(app, UI.APP_CONTAINER_ID, {history, router: true})
  console.debug(`The app mounted on "#${UI.APP_CONTAINER_ID}" with props:`, props)

  set(GlobalKeys.STAGE, 'mounted')
  set(GlobalKeys.HANDLE, handle)
  set(GlobalKeys.STORE, store)
})
