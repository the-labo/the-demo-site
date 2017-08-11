/**
 * Pon tasks
 * @file Ponfile
 * @see https://github.com/realglobe-Inc/pon
 */
'use strict'

const pon = require('pon')

const {react, css, browser, map, ccjs} = require('pon-task-web')
const {fs, mocha, command, coz, fmtjson, env} = require('pon-task-basic')
const {mysql, redis, nginx} = require('pon-task-docker')
const pm2 = require('pon-task-pm2')
const es = require('pon-task-es')
const icon = require('pon-task-icon')
const {seed, setup, drop} = require('pon-task-db')
const {isMacOS} = require('the-check')
const {mkdir, symlink, chmod, del, cp} = fs
const {
  APP_PORT,
  MYSQL_CONTAINER_NAME,
  MYSQL_PUBLISHED_PORT,
  REDIS_CONTAINER_NAME,
  REDIS_PUBLISHED_PORT,
  NGINX_CONTAINER_NAME,
  NGINX_PUBLISHED_PORT,
  APP_PROCESS_NAME
} = require('./Local')

const {fork} = command

const theAssets = require('the-assets')
const {Styles, UI, Urls} = require('./conf')
const {
  JS_EXTERNAL_URL,
  JS_EXTERNAL_CC_URL,
  JS_BUNDLE_URL,
  JS_BUNDLE_CC_URL
} = Urls
const {EXTERNAL_BUNDLES} = UI
const pkg = require('./package.json')
const createDB = () => require('./server/db/create')()

module.exports = pon({
  // ----------------
  // Sub Tasks
  // ----------------
  'struct:mkdir': mkdir([
    'bin',
    'conf',
    'client',
    'client/client',
    'client/shim',
    'client/store',
    'client/ui',
    'client/test',
    'doc',
    'misc',
    'public',
    'server',
    'server/controllers',
    'server/db',
    'server/env',
    'server/server',
    'server/test',
    'tmp',
    'test',
    'var'
  ]),
  'struct:symlink': symlink({
    'shim/conf': 'node_modules/@self/conf',
    'client': 'node_modules/@self/client'
  }, {force: true}),
  'struct:cp': cp({
    'assets/css': 'public/css',
    'assets/fonts': 'public/fonts',
    'assets/icons': 'public/icons'
  }, {force: true}),
  'struct:chmod': chmod({
    'bin/**/*.*': '577'
  }),
  'struct:compile': es('conf', 'shim/conf'),
  'struct:json': fmtjson([
    'conf/**/*.json'
  ], {sort: true}),
  'struct:render': [
    coz(['+(bin|client|conf|doc|misc|server)/**/.*.bud', '.*.bud'])
  ],
  'db:setup': setup(createDB),
  'db:seed': seed(createDB, 'server/db/seeds/:env/*.seed.js'),
  'db:drop': drop(createDB),
  'ui:react': react('client', 'client/shim', {
    pattern: ['*.js', '!(shim)/**/+(*.jsx|*.js)'],
    extractCss: `client/shim/ui/bundle.pcss`,
    watchTargets: 'client/ui/**/*.pcss'
  }),
  'ui:css': css('client/shim/ui', 'public', {pattern: '*.pcss'}),
  'ui:browser': browser('client/shim/ui/entrypoint.js', `public/${JS_BUNDLE_URL}`, {
    externals: EXTERNAL_BUNDLES,
    watchTargets: 'client/shim/**/*.js'
  }),
  'ui:browser-external': browser('client/shim/ui/externals.js', `public/${JS_EXTERNAL_URL}`, {
    requires: EXTERNAL_BUNDLES,
    skipWatching: true,
    watchDelay: 300
  }),
  'assets:install': () => theAssets().installTo('assets'),
  'assets:generate': icon('assets/icons/favicon.svg', {
    text: pkg.name[0],
    font: 'a',
    shape: 'b',
    color: Styles.DOMINANT_COLOR
  }),
  'ui:map': map('public', 'public', {watchDelay: 400}),
  'clean:shim': del('client/shim/**/*.*'),
  'clean:public': del('public/*.*'),
  'clean': ['clean:shim', 'clean:public'],
  'env:production': env('production'),
  'env:test': env('test'),
  'env:debug': env('development'),
  'test:client': mocha('client/test/**/*.js', {timeout: 3000}),
  'production:map': del('public/**/*.map'),
  'production:ccjs': [
    ccjs(`public${JS_BUNDLE_URL}`, `public${JS_BUNDLE_CC_URL}`, {level: 'SIMPLE_OPTIMIZATIONS'}),
    ccjs(`public${JS_EXTERNAL_URL}`, `public${JS_EXTERNAL_CC_URL}`, {level: 'SIMPLE_OPTIMIZATIONS'})
  ],
  'production:prepare': [
    'env:production', 'db', 'build', 'production:map', 'production:ccjs'
  ],
  'debug:server': fork('bin/app.js'),
  'debug:watch': ['ui:*/watch'],
  'docker:mysql': mysql(MYSQL_CONTAINER_NAME, {
    image: 'mysql:8',
    publish: `${MYSQL_PUBLISHED_PORT}:3306`
  }),
  'docker:redis': redis(REDIS_CONTAINER_NAME, {
    image: 'redis:4',
    publish: `${REDIS_PUBLISHED_PORT}:6379`
  }),
  'docker:nginx': nginx(NGINX_CONTAINER_NAME, {
    image: 'nginx:1.13',
    httpPublishPort: NGINX_PUBLISHED_PORT,
    template: 'misc/docker/nginx.conf.template',
    env: {
      HOST_IP: isMacOS() ? 'docker.for.mac.localhost' : '172.17.0.1',
      APP_PORT
    }
  }),
  'pm2': pm2('./bin/app.js', {name: APP_PROCESS_NAME}),
  // ----------------
  // Main Tasks
  // ----------------
  assets: ['assets:*'],
  struct: ['struct:mkdir', 'struct:chmod', 'struct:compile', 'struct:symlink', 'struct:cp', 'struct:render', 'struct:json'],
  ui: ['ui:react', 'ui:css', 'ui:browser', 'ui:browser-external', 'ui:map'],
  db: ['db:setup', 'db:seed'],
  test: ['env:test', 'test:client'],
  build: ['struct', 'ui'],
  prepare: ['struct', 'assets', 'docker', 'db', 'build'],
  watch: ['ui:*', 'ui:*/watch'],
  default: ['build'],
  debug: ['env:debug', 'build', 'debug:*'],
  production: ['production:prepare', 'start'],
  docker: ['docker:redis/run', 'docker:mysql/run', 'docker:nginx/run'],
  start: ['pm2/start'],
  stop: ['pm2/stop'],
  restart: ['pm2/restart'],
  show: ['pm2/show'],
  logs: ['pm2/logs'],
  // ----------------
  // Aliases
  // ----------------
  t: 'test',
  c: 'clean',
  b: 'build',
  w: 'watch',
  d: 'debug',
  p: 'production'
})
