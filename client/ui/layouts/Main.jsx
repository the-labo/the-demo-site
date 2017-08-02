/**
 * Main component
 */
'use strict'

import React from 'react'
import { TheMain } from 'the-components'

const Main = ({ children }) => {
  return (
    <TheMain className='main'>
      {children}
    </TheMain>
  )
}

export default Main
