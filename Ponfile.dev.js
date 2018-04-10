/**
 * Pon tasks for development
 * @file Ponfile
 * @see https://github.com/realglobe-Inc/pon
 */
'use strict'

const pon = require('pon')
const {
  command: {fork, spawn: {npm, npx}},
  fs: {del},
  open,
} = require('pon-task-basic')
const changelog = require('pon-task-changelog')
const {
  fmtjson, mocha, pondoc,
} = require('pon-task-dev')
const icon = require('pon-task-icon')
const theCode = require('the-code/pon')
const theLint = require('the-lint/pon')
const {locales} = require('./conf')
const {E2EConfig} = require('./e2e/constants')
const StoryMapping = require('./e2e/mappings/StoryMapping')
const Local = require('./Local')
const Drawings = require('./misc/icon/Drawings')
const Rules = require('./misc/lint/Rules')
const PondocDev = require('./misc/project/Pondoc.dev')
const {cwd, doc, tasks} = require('./Ponfile')
const theE2E = require('../the-e2e/pon')

const e2e = theE2E(E2EConfig)

module.exports = pon(
  /** @module tasks */
  {

    // -----------------------------------
    // Meta info
    // -----------------------------------
    ...{
      $cwd: cwd,
      $dev: true,
      $doc: {...doc, ...PondocDev},
    },

    // -----------------------------------
    // From Ponfile.js
    // -----------------------------------
    ...tasks,

    // -----------------------------------
    // Sub Tasks for Icon
    // -----------------------------------
    ...{
      /** Generate icons */
      'icon:gen': [
        ...Object.entries(Drawings).map(([name, {data, path}]) => icon(path, data)),
      ].filter(Boolean),
    },

    // -----------------------------------
    // Sub Tasks for Clean Up
    // -----------------------------------
    ...{
      /** Cleanup cache files */
      'clean:cache': del('tmp/cache/**/*.*'),
      /** Cleanup public files */
      'clean:public': del('public/build/*.*'),
      /** Cleanup shim files */
      'clean:shim': del(['shim/**/*.*', 'client/shim/**/*.*']),
    },

    // -----------------------------------
    // Sub Tasks for Debug
    // -----------------------------------
    ...{
      /** Run server for debug */
      'debug:server': [
        'ps:debug', 'env:debug', npx('nodemon', '--config', 'misc/dev/Nodemon.json', 'bin/app.js')
      ],
      /** Watch files for debug */
      'debug:watch': ['env:debug', 'ui:*/watch'],
    },

    // -----------------------------------
    // Sub Tasks for Document
    // -----------------------------------
    ...{
      /** Generate changelog file */
      'doc:changelog': changelog(),
      /** Generate pondoc file */
      'doc:pondoc': pondoc('Ponfile.js', 'misc/project/Pondoc.json'),
      'doc:pondoc:dev': pondoc('Ponfile.dev.js', 'misc/project/Pondoc.dev.json'),
    },

    // -----------------------------------
    // Sub Tasks for Format
    // -----------------------------------
    ...{
      /** Format client files */
      'format:client': theCode([
        'client/ui/**/*.pcss',
        'client/ui/**/*.jsx',
        'client/scenes/**/*.js',
      ], {ignore: 'client/**/index.*'}),
      /** Format conf files */
      'format:conf': theCode(['Local.js', 'Ponfile.js', 'Ponfile.*.js', 'conf/*.js'], {ignore: 'conf/index.js'}),
      /** Format e2e files */
      'format:e2e': theCode('e2e/**/*.js', {}),
      /** Format json files */
      'format:json': fmtjson([
        'conf/**/*.json',
        'client/**/*.json',
        'server/**/*.json',
        'misc/**/*.json',
        'secrets.json',
      ], {ignore: 'client/shim/**/*.json', sort: true}),
      /** Format server files */
      'format:server': theCode('server/**/*.js', {}),
    },

    // -----------------------------------
    // Sub Tasks for Lint
    // -----------------------------------
    ...{
      /** Validate locales */
      'lint:loc': () => locales.validate(),
      'lint:rules': theLint(Rules),
    },

    // -----------------------------------
    // Sub Tasks for Open
    // -----------------------------------
    ...{
      /** Open app in browser */
      'open:app': open(`http://localhost:${Local.NGINX_CONTAINER_PORT}`),
      /** Open homepage field in package.json */
      'open:repo': npm('docs'),
    },

    // -----------------------------------
    // Sub Tasks for Test
    // -----------------------------------
    ...{
      /** Run client tests */
      'test:client': mocha('client/test/**/*.js', {timeout: 3000}),
      /** Run server tests */
      'test:server': mocha('server/test/**/*.js', {timeout: 3000}),
    },

    // -----------------------------------
    // E2E
    // -----------------------------------
    ...{
      /** Install drivers for E2E */
      'e2e:install': e2e.install,
      /** Listen for E2E tests */
      'e2e:listen': e2e.listen,
      /** Run stories for E2E tests */
      'e2e:story': e2e.story(StoryMapping),
    },

    // -----------------------------------
    // Main Tasks
    // -----------------------------------
    ...{
      /** Clean all */
      clean: ['clean:shim', 'clean:public', 'clean:cache'],
      /** Start debugging */
      debug: ['ps:debug', 'env:debug', 'build', 'lint', 'debug:*'],
      /** Run e2e test */
      e2e: ['e2e:story'],
      /** Format source codes */
      format: ['format:conf', 'format:json', 'format:client', 'format:server', 'format:e2e'],
      /** Lint all */
      lint: ['lint:loc', 'lint:rules'],
      /** Open project */
      open: 'open:app',
      /** Prepare project */
      prepare: [
        ...tasks.prepare,
        ...['e2e:install', 'pkg:fix', 'doc', 'lint']
      ],
      start: ['debug:server'],
      stop: [],
      /** Run all tess */
      test: ['env:test', 'test:client', 'test:server'],
      /** Upgrade package */
      upgrade: ['pkg:upg', 'pkg:install:force', 'pkg:link', 'build'],
      /** Run watches */
      watch: ['ui:*', 'ui:*/watch'],
    },

    // -----------------------------------
    // Aliases
    // -----------------------------------
    ...{
      /** Shortcut for `clean` task */
      c: 'clean',
      /** Shortcut for `debug` task */
      d: 'debug',
      /** Shortcut for `debug:server` task */
      ds: 'debug:server',
      /** Shortcut for `e2e` task */
      e: 'e2e',
      /** Shortcut for `e2e:listen` task */
      el: 'e2e:listen',
      /** Shortcut for `format` task */
      f: 'format',
      /** Shortcut for `lint` task */
      l: 'lint',
      /** Shortcut for `open` task */
      o: 'open',
      /** Shortcut for `open` task */
      or: 'open:repo',
      /** Shortcut for `test` task */
      t: 'test',
      /** Shortcut for `upgrade` task */
      u: 'upgrade',
      /** Shortcut for `watch` task */
      w: 'watch',
    },
  }
)
