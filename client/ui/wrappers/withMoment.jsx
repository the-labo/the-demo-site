'use strict'

import moment from 'moment'
import 'moment/locale/ja'
import React from 'react'
import { wrapStack } from 'the-component-util'

function withMoment (Component, options = {}) {
  class WithMoment extends React.Component {
    render () {
      const { lang } = this.props
      const toMoment = (date) => {
        if (!date) {
          return null
        }
        moment.locale(lang)
        return moment(new Date(date))
      }
      const innerProps = {
        ...this.props,
        dateFromNow (date) {
          if (!date) {
            return null
          }
          return toMoment(date).fromNow()
        },
        formatDate (date, format) {
          if (!date) {
            return null
          }
          return toMoment(date).format(format)
        },
      }
      return <Component {...innerProps} />
    }
  }

  WithMoment.wrapStack = wrapStack(WithMoment, Component)

  return WithMoment
}

export default withMoment
