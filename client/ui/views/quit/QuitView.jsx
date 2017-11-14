/**
 * QuitView component
 */
'use strict'

import React from 'react'
import {
  TheView,
  TheButton,
  TheLead,
  TheDone,
  TheButtonGroup,
  TheCondition
} from 'the-components'
import { asView } from '../../wrappers'
import styles from './QuitView.pcss'

function QuitView ({
                     l,
                     busy,
                     confirming,
                     done,
                     onCancel,
                     onConfirm,
                     onConfirmBack,
                     onExecute
                   }) {
  return (
    <TheView className={styles.self}
             spinning={busy}>
      <TheView.Header icon={null}
                      text={l('titles.SIGNDEL_VIEW_TITLE')}
      />
      <TheView.Body>
        <TheCondition if={Boolean(!done && !confirming)}>
          <div>
            <div>
              <TheLead title={l('leads.SIGNDEL_LEAD')}
                       text={l('messages.SIGNDEL_LEAD_NOTICE')}
              />
            </div>
            <br/>
            <TheButtonGroup>
              <TheButton onClick={onCancel}>{l('buttons.DO_CANCEL')}</TheButton>
              <TheButton.Next onClick={onConfirm}
              >{l('buttons.SHOW_SIGNDEL_CONFIRM')}</TheButton.Next>
            </TheButtonGroup>
          </div>
          )
        </TheCondition>
        <TheCondition if={Boolean(!done && confirming)}>
          <div>
            <div>
              <TheLead title={l('leads.SIGNDEL_CONFIRM')}
              />
            </div>
            <br/>
            <TheButtonGroup>
              <TheButton.Prev onClick={onConfirmBack}
              >{l('buttons.DO_BACK')}</TheButton.Prev>
              <TheButton primary
                         onClick={onExecute}>{l('buttons.DO_SIGNDEL')}</TheButton>
            </TheButtonGroup>
          </div>
        </TheCondition>
        <TheCondition if={Boolean(done)}>
          <div>
            <br/>
            <TheDone message={l('messages.SIGNDEL_DONE')}
                     linkTo='/'
                     linkText={l('buttons.SHOW_TOP_AGAIN')}
            />
          </div>
        </TheCondition>
      </TheView.Body>
    </TheView>
  )
}

export default asView(
  QuitView,
  (state) => ({
    busy: state['sign.signdel.busy'],
    confirming: state['sign.signdel.confirming'],
    done: state['sign.signdel.done'],
  }),
  ({signdelScene}) => ({
    onCancel: () => signdelScene.goTo('/'),
    onConfirm: () => signdelScene.toggleConfirming(true),
    onConfirmBack: () => signdelScene.toggleConfirming(false),
    onExecute: () => signdelScene.doSigndel()
  }),
  {
    title: ({l}) => l('titles.SIGNDEL_VIEW_TITLE'),
    onlySigned: true
  }
)
