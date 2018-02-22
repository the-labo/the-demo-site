/**
 * Pon tasks for development
 * @file Ponfile
 * @see https://github.com/realglobe-Inc/pon
 */
'use strict'

const pon = require('pon')
const changelog = require('pon-task-changelog')
const {doc, cwd, tasks} = require('./Ponfile')
const theLint = require('the-lint/pon')
const Local = require('./Local')
const theCode = require('the-code/pon')
const {locales} = require('./conf')
const {
  command: {spawn: {npx}},
  fs: {del,},
  open,
} = require('pon-task-basic')
const {
  mocha, fmtjson, pondoc
} = require('pon-task-dev')
const Rules = require('./misc/lint/Rules')
const Drawings = require('./misc/icon/Drawings')
const icon = require('pon-task-icon')
const PondocDev = require('./misc/project/Pondoc.dev')

module.exports = pon(
  /** @module tasks */
  {
    // -----------------------------------
    // Meta info
    // -----------------------------------
    ...{
      $cwd: cwd,
      $doc: {...doc, ...PondocDev},
      $dev: true,
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
      'icon:generate': [
        Drawings.appIcon && icon('assets/images/app-icon.png', Drawings.appIcon),
        Drawings.fbAppIcon && icon('assets/images/fb/fb-app-icon.png', Drawings.fbAppIcon),
        Drawings.officialAccountIcon && icon('assets/images/accounts/official-account-icon.png', Drawings.officialAccountIcon),
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
      'format:conf': theCode(['Local.js', 'Ponfile.js', 'conf/*.js'], {ignore: 'conf/index.js'}),
      /** Format json files */
      'format:json': fmtjson([
        'conf/**/*.json',
        'client/**/*.json',
        'server/**/*.json',
        'misc/**/*.json',
        'secrets.json',
      ], {sort: true}),
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
    // Main Tasks
    // -----------------------------------
    ...{
      /** Clean all */
      clean: ['clean:shim', 'clean:public', 'clean:cache'],
      /** Start debugging */
      debug: ['ps:debug', 'env:debug', 'build', 'lint', 'debug:*'],
      /** Format source codes */
      format: ['format:conf', 'format:json', 'format:client', 'format:server'],
      /** Lint all */
      lint: ['lint:loc', 'lint:rules'],
      /** Open project */
      open: 'open:*',
      /** Prepare project */
      prepare: [
        ...tasks.prepare,
        ...['pkg:fix', 'doc', 'lint']
      ],
      start: ['debug:server'],
      stop: [],
      /** Run all tess */
      test: ['env:test', 'test:client', 'test:server'],
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
      /** Shortcut for `format` task */
      f: 'format',
      /** Shortcut for `lint` task */
      l: 'lint',
      /** Shortcut for `open` task */
      o: 'open',
      /** Shortcut for `test` task */
      t: 'test',
      /** Shortcut for `watch` task */
      w: 'watch',
    }
  }
)