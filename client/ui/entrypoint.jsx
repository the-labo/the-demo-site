'use strict'
import 'the-polyfill/apply'

import React from 'react'
import { once, get, set, mount, rescue } from 'the-window'
import App from './App'
import { UI, locales } from '@self/conf'
import client from '../client'
import store from '../store'
import handle from '../handle'

const {APP_STAGE_NAME, APP_PROP_NAME, APP_CONTAINER_ID, DEFAULT_LANG} = UI

set(APP_STAGE_NAME, 'registering')

once('DOMContentLoaded', () => {
  set(APP_STAGE_NAME, 'mounting')

  const [lang] = (get('navigator.language') || DEFAULT_LANG).split('-')
  const props = get(APP_PROP_NAME)
  const app = (<App {...props} {...{store, client, handle}}/>)
  const l = locales.bind(lang)
  handle.setAttributes({store, client, l, lang})

  mount(app, APP_CONTAINER_ID, {router: true})
    .then(() => {
      console.debug(`The app mounted on "#${APP_CONTAINER_ID}" with props:`, props)
      set(APP_STAGE_NAME, 'mounted')
    })

  rescue((e) => {
    const {lang} = props
    const l = locales.bind(lang)
    const {toast} = store
    toast.error.push(l('errors.UNEXPECTED_ERROR'))
  })
})
