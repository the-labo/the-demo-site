/**
 * Header component
 */
'use strict'

import React from 'react'
import {
  TheHeader
} from 'the-components'
import { withLoc } from 'the-loc'
import { Urls, Icons } from '@self/conf'

const {Logo, Tab, TabItem, RightArea} = TheHeader
const {Item: MenuItem} = TheDropdownMenu

const Header = ({l}) => {
  return (
    <TheHeader className='header'>
      <TheHeader.Logo>{l('app.APP_NAME')}</TheHeader.Logo>
    </TheHeader>
  )
}

export default withLoc(Header)
