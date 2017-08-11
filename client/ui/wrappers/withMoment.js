'use strict'

const React = require('react')
const moment = require('moment')
require('moment/locale/ja')

function withMoment (Component, options = {}) {
  return class WithMoment extends React.Component {
    render () {
      const s = this
      const {props} = s
      const {lang} = props
      const toMoment = (date) => {
        if (!date) {
          return null
        }
        moment.locale(lang)
        return moment(new Date(date))
      }
      const innerProps = Object.assign(
        {},
        props,
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
      return React.createElement(Component, innerProps)
    }
  }
}

module.exports = withMoment
