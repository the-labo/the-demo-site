#!/usr/bin/env node
/**
 * Format files before commit
 */
'use strict'

const pon = require('../../Ponfile')
process.chdir(pon.cwd)

const flatten = (r = [], v) => [].concat(r, v)

void async function () {
  const results = await pon.run('format', {disableLogging: true})
  const filenames = Object.values(results).reduce(flatten).reduce((r, v) => [].concat(r, v))
  if (filenames.length > 0) {
    console.error(`[COMMIT_REJECTED] Files just formatted. Add the changes and try again (${JSON.stringify(filenames)})`)
    process.exit(1)
  }

}()

