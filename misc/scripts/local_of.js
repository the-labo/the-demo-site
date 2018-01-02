#!/usr/bin/env node

/**
 * Print local variable to stdout
 */
'use strict'

const Local = require('@self/Local')
const [, , name] = process.argv

if (!name) {
  throw new Error('name is required')
}
if (!(name in Local)) {
  throw new Error(`"${name}" is not found in Local`)
}

process.stdout.write(String(Local[name]))
