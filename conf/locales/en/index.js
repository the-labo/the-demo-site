/**
 * en locales
 * @module en
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const alt = _d(require('./alt'))
const app = _d(require('./app'))
const buttons = _d(require('./buttons'))
const captions = _d(require('./captions'))
const checks = _d(require('./checks'))
const errors = _d(require('./errors'))
const labels = _d(require('./labels'))
const leads = _d(require('./leads'))
const mail = _d(require('./mail'))
const messages = _d(require('./messages'))
const org = _d(require('./org'))
const placeholders = _d(require('./placeholders'))
const roleCodes = _d(require('./roleCodes'))
const tabs = _d(require('./tabs'))
const titles = _d(require('./titles'))
const toasts = _d(require('./toasts'))
const warnings = _d(require('./warnings'))

module.exports = {
  alt,
  app,
  buttons,
  captions,
  checks,
  errors,
  labels,
  leads,
  mail,
  messages,
  org,
  placeholders,
  roleCodes,
  tabs,
  titles,
  toasts,
  warnings,
}
