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
  command: {fork, spawn: {git}},
  coz,
  fmtjson,
  env
} = require('pon-task-basic')
const {mysql, redis, nginx} = require('pon-task-docker')
const pm2 = require('pon-task-pm2')
const es = require('pon-task-es')
const icon = require('pon-task-icon')
const db = require('pon-task-db')
const md = require('pon-task-md')
const Local = require('./Local')

const {envify} = browser.transforms
const {setting, secret} = Local

const theAssets = require('the-assets')
const {UI, Urls} = require('./conf')
const createDB = () => require('./server/db/create').forTask()
const migration = require('./server/db/migration')

const browserExternalIgnorePatch = require('./misc/patches/browserExternalIgnorePatch')
const Directories = require('./misc/project/Directories')
const Containers = require('./misc/docker/Containers')
const Drawings = require('./misc/icon/Drawings')

module.exports = pon({
  // ----------------
  // Sub Tasks
  // ----------------
  'struct:mkdir': mkdir([
    ...Object.keys(Directories)
  ]),
  'struct:symlink': symlink({
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
    'assets/images': 'public/images',
    'assets/webfonts': 'public/webfonts',
    'assets/icons': 'public/icons',
  }, {force: true}),
  'struct:chmod': chmod({
    'bin/**/*.*': '577',
    'misc/scripts/*.*': '577',
    'misc/**/*.sh': '577'
  }),
  'struct:compile': [
    es('conf', 'shim/conf'),
    es('utils', 'shim/utils'),
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
  'struct:pkg': [
    cp({
      'package.json': 'shim/package.json',
      'client/index.mjs': 'client/shim/index.mjs',  // For import
      'conf/index.mjs': 'shim/conf/index.mjs',  // For import
    }, {force: true}),
    del('package-lock.json'), // Using yarn
  ],
  'unless:prod': env.notFor('production'),
  'maint:on': write('public/status/maintenance'),
  'maint:off': del('public/status/maintenance'),
  'db:setup': db.setup(createDB),
  'db:cli': () => createDB().cli(),
  'db:seed': db.seed(createDB, 'server/db/seeds/:env/*.seed.js'),
  'db:migrate': db.migrate(createDB, migration, {snapshot: 'var/migration/snapshots'}),
  'db:drop': ['unless:prod', db.drop(createDB)],
  'db:dump': db.dump(createDB, 'var/backup/dump', {max: Local.DUMP_ROTATION}),
  'db:load': db.load.ask(createDB),
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
        // TODO remove patch
        ...browserExternalIgnorePatch({isProduction}),
      ]
    })
  ),
  'assets:install': () => theAssets().installTo('assets', {copy: true}),
  'assets:markdown': md('assets/markdowns', 'public/partials', {
    vars: require('./conf/locales')
  }),
  'icon:generate': [
    icon('assets/images/app-icon.png', Drawings.appIcon),
    icon('assets/images/fb/fb-app-icon.png', Drawings.fbAppIcon),
    icon('assets/images/accounts/official-account-icon.png', Drawings.officialAccountIcon),
  ],
  'ui:map': map('public', 'public', {watchDelay: 400}),
  'clean:shim': del(['shim/**/*.*', 'client/shim/**/*.*']),
  'clean:cache': del('tmp/cache/**/*.*'),
  'clean:public': del('public/build/*.*'),
  'env:prod': env('production'),
  'env:test': env('test'),
  'env:debug': env('development', {DEBUG: 'app:*'}),
  'test:client': mocha('client/test/**/*.js', {timeout: 3000,}),
  'test:server': mocha('server/test/**/*.js', {timeout: 3000,}), // TODO Use this when node 10 released
  'prod:map': del('public/**/*.map'),
  'prod:js': ccjs([
    `public${Urls.JS_EXTERNAL_URL}`,
    `public${Urls.JS_BUNDLE_URL}`
  ], `public${Urls.PRODUCTION_JS_URL}`),
  'prod:css': css.minify([
    `public${Urls.CSS_THEME_URL}`,
    `public${Urls.CSS_FONT_URL}`,
    `public${Urls.CSS_BUNDLE_URL}`,
  ], `public${Urls.PRODUCTION_CSS_URL}`),
  'prod:compile': ['env:prod', 'build', 'prod:map', 'prod:css', 'prod:js',],
  'prod:db': ['env:prod', 'db'],
  'debug:server': ['env:debug', fork('bin/app.mjs', {
    // TODO Remove experimental flag when node 10 release
    env: {NODE_OPTIONS: '--experimental-modules'}
  })],
  'debug:watch': ['env:debug', 'ui:*/watch'],
  'docker:mysql': mysql(Containers.mysql.name, Containers.mysql.options),
  'docker:redis': redis(Containers.redis.name, Containers.redis.options),
  'docker:nginx': nginx(Containers.nginx.name, Containers.nginx.options),
  'secret:encrypt': () => secret.encrypt(),
  'secret:decrypt': () => secret.decrypt(),
  'pm2:app': pm2('./bin/app.js', {name: Local.APP_PROCESS_NAME}),
  'pm2:backup:dump': pm2.pon('db:dump', {name: `${Local.BACKUP_PROCESS_NAME}:dump`, cron: Local.DUMP_SCHEDULE}),
  'git:catchup': [git('stash'), git('pull')],
  // ----------------
  // Main Tasks
  // ----------------
  assets: ['assets:*'],
  struct: ['struct:mkdir', 'struct:compile', 'struct:*'],
  ui: ['ui:css', 'ui:react', 'ui:browser', 'ui:browser-external', 'ui:map'],
  db: ['db:setup', 'db:seed'],
  test: ['env:test', 'test:client', 'test:server'],
  clean: ['clean:shim', 'clean:public', 'clean:cache'],
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
  deploy: ['maint:on', 'stop', 'git:catchup', 'prod', 'maint:off'],
  // ----------------
  // Aliases
  // ----------------
  t: 'test',
  c: 'clean',
  b: 'build',
  w: 'watch',
  d: 'debug',
  p: 'prod'

})
