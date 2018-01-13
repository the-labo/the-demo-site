/**
 * Pon tasks
 * @file Ponfile
 * @see https://github.com/realglobe-Inc/pon
 */
'use strict'

const pon = require('pon')

const {react, css, browser, map, ccjs} = require('pon-task-web')
const {
  fs: {write, mkdir, symlink, chmod, del, cp, concat},
  mocha,
  command: {fork, spawn},
  coz,
  fmtjson,
  env
} = require('pon-task-basic')
const {mysql, redis, nginx} = require('pon-task-docker')
const pm2 = require('pon-task-pm2')
const es = require('pon-task-es')
const icon = require('pon-task-icon')
const {setup, seed, drop, dump, migrate, load} = require('pon-task-db')
const md = require('pon-task-md')
const {isMacOS} = require('the-check')
const {envify} = browser.transforms
const {
  APP_PORT,
  MYSQL_CONTAINER_NAME,
  MYSQL_PUBLISHED_PORT,
  REDIS_CONTAINER_NAME,
  REDIS_PUBLISHED_PORT,
  NGINX_CONTAINER_NAME,
  NGINX_PUBLISHED_PORT,
  APP_PROCESS_NAME,
  BACKUP_PROCESS_NAME,
  DUMP_SCHEDULE,
  DUMP_ROTATION,
  setting,
  secret
} = require('./Local')

const theAssets = require('the-assets')
const {Styles, UI, Urls} = require('./conf')
const pkg = require('./package.json')
const createDB = () => require('./server/db/create').forTask()
const migration = require('./server/db/migration')

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
    'utils',
    'tmp',
    'test',
    'var'
  ]),
  'struct:symlink': symlink({
    'package.json': 'shim/package.json',
    'shim/conf': 'node_modules/@self/conf',
    'Local.js': 'node_modules/@self/Local.js',
    'shim/utils': 'node_modules/@self/utils',
    'client': 'node_modules/@self/client'
  }, {force: true}),
  'struct:cp': cp({
    'assets/text': 'public',
    'assets/html/partials': 'public/partials',
    'assets/html/errors': 'public/errors',
    'assets/css': 'public/css',
    'assets/webfonts': 'public/webfonts',
    'assets/icons': 'public/icons'
  }, {force: true}),
  'struct:chmod': chmod({
    'bin/**/*.*': '577',
    'misc/scripts/*.*': '577',
    'misc/**/*.sh': '577'
  }),
  'struct:compile': [
    es('conf', 'shim/conf'),
    es('utils', 'shim/utils')
  ],
  'struct:json': fmtjson([
    'conf/**/*.json',
    'client/**/*.json'
  ], {sort: true}),
  'struct:render': [
    coz([
      '+(conf|client|server)/**/.index.*.bud',
      '+(assets|bin|client|conf|doc|misc|server|test|utils)/**/.*.bud',
      '.*.bud'
    ])
  ],
  'unless:prod': env.notFor('production'),
  'maint:on': write('public/status/maintenance'),
  'maint:off': del('public/status/maintenance'),
  'db:setup': setup(createDB),
  'db:cli': () => createDB().cli(),
  'db:seed': seed(createDB, 'server/db/seeds/:env/*.seed.js'),
  'db:migrate': migrate(createDB, migration, {snapshot: 'var/migration/snapshots'}),
  'db:drop': ['unless:prod', drop(createDB)],
  'db:dump': dump(createDB, 'var/backup/dump', {max: DUMP_ROTATION}),
  'db:load': load.ask(createDB),
  'db:reset': ['unless:prod', 'db:drop', 'db:setup', 'db:seed'],
  'ui:react': react('client', 'client/shim', {
    pattern: ['*.js', '!(shim)/**/+(*.jsx|*.js|*.json)'],
    extractCss: `client/shim/ui/bundle.pcss`,
    watchTargets: 'client/ui/**/*.pcss'
  }),
  'ui:css': [
    css('client/ui', 'client/shim/ui', {
      modules: true,
      pattern: ['*.pcss', '+(bounds|views|fragments|layouts|wrappers|components)/**/*.pcss'],
      inlineMap: true
    }),
    concat([
      'client/shim/ui/**/*.css',
      'client/ui/base.pcss',
      'client/ui/constants/variables.pcss'
    ], 'public/build/bundle.pcss', {}),
    css('public/build', 'public/build', {pattern: '*.pcss'})
  ],
  'ui:browser': env.dynamic(({isProduction}) =>
    browser('client/shim/ui/entrypoint.js', `public${Urls.JS_BUNDLE_URL}`, {
      externals: UI.EXTERNAL_BUNDLES,
      watchTargets: 'client/shim/**/*.js',
      transforms: [envify()],
      fullPaths: !isProduction()
    }), {sub: ['watch']}
  ),
  'ui:browser-external': env.dynamic(({isProduction}) =>
    browser('client/shim/ui/externals.js', `public${Urls.JS_EXTERNAL_URL}`, {
      requires: UI.EXTERNAL_BUNDLES,
      skipWatching: true,
      watchDelay: 300,
      transforms: [envify()],
      fullPaths: !isProduction(),
      ignores: [
        // TODO Be smarter
        ...(isProduction() ? [
          require.resolve('react/cjs/react.development.js'),
          require.resolve('react-dom/cjs/react-dom.development.js'),
          require.resolve('react-dom/cjs/react-dom-server.browser.development.js')
        ] : [
          require.resolve('react/cjs/react.production.min.js'),
          require.resolve('react-dom/cjs/react-dom.production.min.js'),
          require.resolve('react-dom/cjs/react-dom-server.browser.production.min.js')
        ])
      ]
    })
  ),
  'assets:install': () => theAssets().installTo('assets', {copy: true}),
  'assets:compile': md('assets/markdowns', 'assets/html/partials', {
    vars: require('./conf/locales')
  }),
  'image:generate': icon('assets/icons/favicon.png', {
    text: pkg.name[0],
    font: 'a',
    shape: 'b',
    color: Styles.DOMINANT_COLOR
  }),
  'ui:map': map('public', 'public', {watchDelay: 400}),
  'clean:shim': del('client/shim/**/*.*'),
  'clean:cache': del('tmp/cache/**/*.*'),
  'clean:public': del('public/build/*.*'),
  'clean': ['clean:shim', 'clean:public', 'clean:cache'],
  'env:prod': env('production'),
  'env:test': env('test'),
  'env:debug': env('development', {DEBUG: 'app:*'}),
  'test:client': mocha('client/test/**/*.js', {timeout: 3000}),
  'test:server': mocha('server/test/**/*.js', {timeout: 3000}),
  'prod:map': del('public/**/*.map'),
  'prod:js': ccjs([
    `public${Urls.JS_EXTERNAL_URL}`,
    `public${Urls.JS_BUNDLE_URL}`
  ], `public${Urls.PRODUCTION_JS_URL}`, {memory: '512m'}),
  'prod:css': css.minify([
    `public${Urls.CSS_THEME_URL}`,
    `public${Urls.CSS_FONT_URL}`,
    `public${Urls.CSS_BUNDLE_URL}`,
  ], `public${Urls.PRODUCTION_CSS_URL}`),
  'prod:compile': [
    'env:prod', 'build', 'prod:map', 'prod:css', 'prod:js',
  ],
  'prod:db': [
    'env:prod', 'db'
  ],
  'debug:server': ['env:debug', fork('bin/app.mjs', {
    // TODO Remove experimental flag when node 10 release
    env: {NODE_OPTIONS: '--experimental-modules'}
  })],
  'debug:watch': ['env:debug', 'ui:*/watch'],
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
  'secret:encrypt': () => secret.encrypt(),
  'secret:decrypt': () => secret.decrypt(),
  'pm2:app': pm2('./bin/app.js', {name: APP_PROCESS_NAME}),
  'pm2:backup:dump': pm2.pon('db:dump', {name: `${BACKUP_PROCESS_NAME}:dump`, cron: DUMP_SCHEDULE}),
  'deploy:pull': spawn.git('pull'),
  // ----------------
  // Main Tasks
  // ----------------
  assets: ['assets:*'],
  struct: ['struct:mkdir', 'struct:chmod', 'struct:compile', 'struct:symlink', 'struct:cp', 'struct:render', 'struct:json'],
  ui: ['ui:css', 'ui:react', 'ui:browser', 'ui:browser-external', 'ui:map'],
  db: ['db:setup', 'db:seed'],
  test: ['env:test', 'test:client', 'test:server'],
  build: ['struct', 'ui'],
  prepare: ['secret:encrypt', 'struct', 'assets', 'docker', 'db', 'build'],
  watch: ['ui:*', 'ui:*/watch'],
  default: ['build'],
  debug: ['env:debug', 'build', 'debug:*'],
  prod: ['env:prod', 'prod:compile', 'prod:db', 'start'],
  docker: ['docker:redis/run', 'docker:mysql/run', 'docker:nginx/run'],
  start: ['pm2:app/start', 'pm2:backup:*/start'],
  stop: ['pm2:app/stop', 'pm2:backup:*/stop'],
  restart: ['pm2:app/restart', 'pm2:backup:*/restart'],
  show: ['pm2:app/show'],
  logs: ['pm2:app/logs'],
  setting: () => setting.ask(),
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
