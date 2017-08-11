/**
 * ActionBar component
 */
'use strict'

import React from 'react'
import { TheButton, TheContainer } from 'the-components'
import { asPure } from '../../wrappers'
import c from 'classnames'
import styles from './ActionBar.pcss'

const ActionBar = asPure(function ActionBar ({
                                               lead,
                                               hidden,
                                               icons = {},
                                               buttons = {},
                                               handlers = {},
                                               danger = [],
                                               className
                                             }) {
  return (
    <div className={c('action-bar', styles.self, className, {
      [styles.hidden]: hidden
    })}>

      <TheContainer className={styles.inner}>

        {
          lead && (
            <p className={styles.lead}>{lead}</p>
          )
        }

        {
          Object.keys(buttons).map((name) => (
            <TheButton onClick={handlers[name]}
                       icon={icons[name]}
                       key={name}
                       danger={danger[name]}
            >{buttons[name]}</TheButton>
          ))
        }
      </TheContainer>
    </div>
  )
})

export default ActionBar
