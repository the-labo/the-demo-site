/**
 * Project configurations
 * @module conf
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const HistoryTypes = _d(require('./HistoryTypes'))
const Icons = _d(require('./Icons'))
const Lifetimes = _d(require('./Lifetimes'))
const RoleCodes = _d(require('./RoleCodes'))
const Styles = _d(require('./Styles'))
const UI = _d(require('./UI'))
const Urls = _d(require('./Urls'))
const locales = _d(require('./locales'))

module.exports = {
  HistoryTypes,
  Icons,
  Lifetimes,
  RoleCodes,
  Styles,
  UI,
  Urls,
  locales,
}
