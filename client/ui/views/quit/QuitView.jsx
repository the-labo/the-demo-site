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
                     confirm,
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
        <TheCondition if={Boolean(!done && !confirm)}>
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
        </TheCondition>
        <TheCondition if={Boolean(!done && confirm)}>
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
    busy: state['quit.busy'],
    confirm: state['quit.confirm'],
    done: state['quit.done'],
  }),
  ({
     quitScene,
     accountScene
   }) => ({
    onCancel: () => quitScene.goTo('/'),
    onConfirm: () => quitScene.set({confirm: true}),
    onConfirmBack: () => quitScene.set({confirm: false}),
    onExecute: async () => {
      await quitScene.doQuit()
      quitScene.set({confirm: false, done: true})
      await accountScene.doSync()
    }
  }),
  {
    title: ({l}) => l('titles.SIGNDEL_VIEW_TITLE'),
    onlySigned: true
  }
)
