'use strict'

import React from 'react'
import moment from 'moment'
import 'moment/locale/ja'

function withMoment (Component, options = {}) {
  return class WithMoment extends React.Component {
    render () {
      const {lang} = this.props
      const toMoment = (date) => {
        if (!date) {
          return null
        }
        moment.locale(lang)
        return moment(new Date(date))
      }
      const innerProps = Object.assign(
        {},
        this.props,
        {
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
          }
        }
      )
      return <Component {...innerProps} />
    }
  }
}

export default withMoment
