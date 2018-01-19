#!/usr/bin/env node
/**
 * Make sure people using `yarn install` on this project
 */
'use strict'

const path = require('path')
const red = (msg) => `\x1b[41m${msg}\x1b[0m`

const projectDir = path.resolve(__dirname, '../../')
const isLocalInstall = process.cwd() === projectDir
if (isLocalInstall) {
  const byYarn = /yarn/.test(process.env.npm_execpath)
  if (!byYarn) {
    console.error(`
${red('[YOU_MUST_USE_YARN]')} Use \`yarn install\` for this project, NOT \`npm install.\`
 
`)
    process.exit(1)
  }
}
