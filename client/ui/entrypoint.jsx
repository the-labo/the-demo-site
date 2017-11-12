'use strict'

import 'the-polyfill/apply'

import React from 'react'
import { once, get, mount, rescue } from 'the-window'
import App from './App'
import { UI, locales } from '@self/conf'
import client from '../client'
import store from '../store'

const {APP_PROP_NAME, APP_CONTAINER_ID} = UI

once('DOMContentLoaded', () => {
  const props = get(APP_PROP_NAME)
  const app = (<App {...props} {...{store, client}}/>)
  mount(app, APP_CONTAINER_ID, {router: true})
    .then(() => {
      console.debug(`The app mounted on "#${APP_CONTAINER_ID}" with props:`, props)
    })

  rescue(() => {
    const {lang} = s.props
    const l = locales.bind(lang)
    const {toast} = store
    toast.error.push(l('errors.UNEXPECTED_ERROR'))
  })
})
