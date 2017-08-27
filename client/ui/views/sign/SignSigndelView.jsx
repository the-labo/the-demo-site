/**
 * SignSigndelView component
 */
'use strict'

import React from 'react'
import {
  TheView,
  TheButton,
  TheLead,
  TheDone,
  TheButtonGroup
} from 'the-components'
import { asView, withTitle } from '../../wrappers'
import { SignScene } from '../../../scenes'
import styles from './SignSigndelView.pcss'

class SignSigndelView extends React.Component {
  constructor (props) {
    super(props)
    const s = this
    s.signScene = new SignScene(props)
  }

  render () {
    const s = this
    const {props, signScene} = s
    const {
      l,
      busy,
      confirming,
      done
    } = props
    return (
      <TheView className={styles.self}
               spinning={busy}>
        <TheView.Header icon={null}
                        text={l('titles.SIGNDEL_VIEW_TITLE')}
        />
        <TheView.Body>
          {
            (!done && !confirming) && (
              <div>
                <div>
                  <TheLead title={l('leads.SIGNDEL_LEAD')}
                           text={l('messages.SIGNDEL_LEAD_NOTICE')}
                  />
                </div>
                <br/>
                <TheButtonGroup>
                  <TheButton onClick={() => signScene.abortSigndel()}>{l('buttons.DO_CANCEL')}</TheButton>
                  <TheButton.Next onClick={() => signScene.toggleSigndelConfirming(true)}
                  >{l('buttons.SHOW_SIGNDEL_CONFIRM')}</TheButton.Next>
                </TheButtonGroup>
              </div>
            )
          }
          {
            (!done && confirming) && (
              <div>
                <div>
                  <TheLead title={l('leads.SIGNDEL_CONFIRM')}
                  />
                </div>
                <br/>
                <TheButtonGroup>
                  <TheButton.Prev onClick={() => signScene.toggleSigndelConfirming(false)}
                  >{l('buttons.DO_BACK')}</TheButton.Prev>
                  <TheButton primary
                             onClick={() => signScene.doSigndel()}>{l('buttons.DO_SIGNDEL')}</TheButton>
                </TheButtonGroup>
              </div>
            )
          }
          {
            done && (
              <div>
                <br/>
                <TheDone message={l('messages.SIGNDEL_DONE')}
                         linkTo='/'
                         linkText={l('buttons.SHOW_TOP_AGAIN')}
                />
              </div>
            )
          }
        </TheView.Body>
      </TheView>
    )
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }
}

export default asView(
  withTitle(SignSigndelView, ({l}) => l('titles.SIGNDEL_VIEW_TITLE')),
  (state) => ({
    busy: state['sign.signdel.busy'],
    confirming: state['sign.signdel.confirming'],
    done: state['sign.signdel.done'],
  })
)
