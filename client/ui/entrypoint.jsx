'use strict'

import 'babel-polyfill'
import './constants/variables.pcss'
import './base.pcss'

import React from 'react'
import { once, get, mount } from 'the-window'
import App from './App'
import { UI } from '@self/conf'
import client from '../client'
import store from '../store'
const { APP_PROP_NAME, APP_CONTAINER_ID } = UI

once('DOMContentLoaded', () => {
  const props = get(APP_PROP_NAME)
  let app = (<App {...props} {...{ store, client }}/>)
  mount(app, APP_CONTAINER_ID, { router: true })
    .then(() => {
      console.debug(`The app mounted on "#${APP_CONTAINER_ID}" with props:`, props)
    })
})
