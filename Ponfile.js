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
  command: {spawn: {git, npx}},
  coz,
  fmtjson,
  env,
  open,
  pondoc,
} = require('pon-task-basic')
const {mysql, redis, nginx} = require('pon-task-docker')
const pm2 = require('pon-task-pm2')
const es = require('pon-task-es')
const icon = require('pon-task-icon')
const db = require('pon-task-db')
const md = require('pon-task-md')
const Local = require('./Local')
const {isProduction} = require('the-check')
const {envify} = browser.transforms
const {setting, secret} = Local

const theAssets = require('the-assets')
const thePS = require('the-ps').create
const {Urls} = require('./conf')
const createDB = () => require('./server/db/create').forTask()
const migration = require('./server/db/migration')

const ExternalIgnorePatch = require('./misc/browser/ExternalIgnorePatch')
const Externals = require('./misc/browser/Externals')
const Directories = require('./misc/project/Directories')
const Pondoc = require('./misc/project/Pondoc')
const Containers = require('./misc/docker/Containers')
const Drawings = require('./misc/icon/Drawings')

const locales = require('./conf/locales')

module.exports = pon(
  /** @module tasks */
  {
    // ----------------
    // Meta info
    // ----------------
    $doc: Pondoc,
    // ----------------
    // Sub Tasks
    // ----------------
    /** Generate project directories */
    'struct:mkdir': mkdir([
      ...Object.keys(Directories)
    ]),
    /** Generate symbolic links */
    'struct:symlink': symlink({
      'shim/conf': 'node_modules/@self/conf',
      'Local.js': 'node_modules/@self/Local.js',
      'shim/utils': 'node_modules/@self/utils',
      'client': 'node_modules/@self/client',
      'assets/data': 'node_modules/@self/data',
    }, {force: true}),
    /** Execute file copy */
    'struct:cp': cp({
      'assets/text': 'public',
      'assets/html/errors': 'public/errors',
      'assets/css': 'public/css',
      'assets/images': 'public/images',
      'assets/webfonts': 'public/webfonts',
      'assets/icons': 'public/icons',
    }, {force: true}),
    /** Change file permissions */
    'struct:chmod': chmod({
      'bin/**/*.*': '577',
      'misc/scripts/*.*': '577',
      'misc/**/*.sh': '577'
    }),
    /** Compile files */
    'struct:compile': [
      es('conf', 'shim/conf', {sourceRoot: '../../../../conf',}),
      es('utils', 'shim/utils', {sourceRoot: '../../../../conf',}),
    ],
    /** Format json files */
    'struct:json': fmtjson([
      'conf/**/*.json',
      'client/**/*.json'
    ], {sort: true}),
    /** Render coz templates */
    'struct:render': [
      coz([
        '+(conf|client|server)/**/.index.*.bud',
        '+(assets|bin|client|conf|doc|misc|server|test|utils)/**/.*.bud',
        '.*.bud'
      ])
    ],
    /** Prepare sub packages */
    'struct:pkg': [
      cp({
        'package.json': 'shim/package.json',
      }, {force: true}),
      del('package-lock.json'), // Using yarn
    ],
    /** Print locale settings */
    'loc:print': () => console.log(locales.toCompound()),
    /** Validate locales */
    'loc:validate': () => locales.validate(),
    /** Make sure that not production */
    'assert:not-prod': env.notFor('production'),
    /** Enable maintenance mode */
    'maint:on': write('public/status/maintenance'),
    /** Disable maintenance mode */
    'maint:off': del('public/status/maintenance'),
    /** Setup database */
    'db:setup': db.setup(createDB),
    /** Open database cli */
    'db:cli': () => createDB().cli(),
    /** Generate test data */
    'db:seed': db.seed(createDB, 'server/db/seeds/:env/*.seed.js'),
    /** Migrate data */
    'db:migrate': db.migrate(createDB, migration, {snapshot: 'var/migration/snapshots'}),
    /** Drop database */
    'db:drop': ['assert:not-prod', db.drop(createDB)],
    /** Dump data */
    'db:dump': db.dump(createDB, 'var/backup/dump', {max: Local.DUMP_ROTATION}),
    /** Load data from dum */
    'db:load': db.load.ask(createDB),
    /** Drop and setup database again */
    'db:reset': ['assert:not-prod', 'db:drop', 'db:setup', 'db:seed'],
    /** Compile react components */
    'ui:react': react('client', 'client/shim', {
      sourceRoot: '..',
      pattern: ['*.js', '*.jsx', '!(shim)/**/+(*.jsx|*.js|*.json)'],
      extractCss: `client/shim/ui/bundle.pcss`,
      watchTargets: 'client/ui/**/*.pcss',

    }),
    /** Compile stylesheets */
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
    /** Run css watch */
    'ui:css/watch': 'ui:css/*/watch',
    /** Bundle browser script */
    'ui:browser': env.dynamic(({isProduction}) =>
      browser('client/shim/ui/entrypoint.js', `public${Urls.JS_BUNDLE_URL}`, {
        externals: Externals,
        watchTargets: 'client/shim/**/*.js',
        transforms: [envify()],
        // fullPaths: !isProduction(),
        fullPaths: false,
      }), {sub: ['watch', 'deps']}
    ),
    /** Bundle external browser script */
    'ui:browser-external': env.dynamic(({isProduction}) =>
      browser('client/shim/ui/externals.js', `public${Urls.JS_EXTERNAL_URL}`, {
        requires: Externals,
        skipWatching: true,
        watchDelay: 300,
        transforms: [envify()],
        // fullPaths: !isProduction(),
        fullPaths: false,
        ignores: [
          // TODO remove patch
          ...ExternalIgnorePatch({isProduction}),
        ],
      }), {sub: ['deps']}
    ),
    /** Install asset files */
    'assets:install': () => theAssets().installTo('assets', {copy: true}),
    /** Render markdown assets */
    'assets:markdown': md('assets/markdowns', 'public/partials', {
      vars: {...locales}
    }),
    /** Generate icons */
    'icon:generate': [
      icon('assets/images/app-icon.png', Drawings.appIcon),
      icon('assets/images/fb/fb-app-icon.png', Drawings.fbAppIcon),
      icon('assets/images/accounts/official-account-icon.png', Drawings.officialAccountIcon),
    ],
    /** Extract map files */
    'ui:map': map('public', 'public', {pattern: '**/*.js', watchDelay: 400}),
    /** Cleanup shim files */
    'clean:shim': del(['shim/**/*.*', 'client/shim/**/*.*']),
    /** Cleanup cache files */
    'clean:cache': del('tmp/cache/**/*.*'),
    /** Cleanup public files */
    'clean:public': del('public/build/*.*'),
    /** Set env variables for production */
    'env:prod': env('production'),
    /** Set env variables for test */
    'env:test': env('test'),
    /** Set env variables for debug */
    'env:debug': env('development', {DEBUG: 'app:*', ...Local}),
    /** Run client tests */
    'test:client': mocha('client/test/**/*.js', {timeout: 3000,}),
    /** Run server tests */
    'test:server': mocha('server/test/**/*.js', {timeout: 3000,}), // TODO Use this when node 10 released
    /** Delete source map files for production */
    'prod:map': del('public/**/*.map'),
    /** Compile js files for production */
    'prod:js': ccjs([
      `public${Urls.JS_EXTERNAL_URL}`,
      `public${Urls.JS_BUNDLE_URL}`
    ], `public${Urls.PRODUCTION_JS_URL}`),
    /** Compile css files for production */
    'prod:css': css.minify([
      `public${Urls.CSS_THEME_URL}`,
      `public${Urls.CSS_FONT_URL}`,
      `public${Urls.CSS_BUNDLE_URL}`,
    ], `public${Urls.PRODUCTION_CSS_URL}`),
    /** Compile files for production */
    'prod:compile': ['env:prod', 'build', 'prod:map', 'prod:css', 'prod:js',],
    /** Prepare database for production */
    'prod:db': ['env:prod', 'db'],
    /** Run server for debug */
    'debug:server': [
      'env:debug',
      () => thePS('var/app/dev.pid').acquire(),
      npx('nodemon', '--config', 'misc/dev/Nodemon.json', 'bin/app.js')
    ],
    /** Watch files for debug */
    'debug:watch': ['env:debug', 'ui:*/watch'],
    /** Prepare mysql docker container */
    'docker:mysql': mysql(Containers.mysql.name, Containers.mysql.options),
    /** Prepare redis docker container */
    'docker:redis': redis(Containers.redis.name, Containers.redis.options),
    /** Prepare nginx docker container */
    'docker:nginx': nginx(Containers.nginx.name, Containers.nginx.options),
    /** Encrypt secret file */
    'secret:encrypt': () => secret.encrypt(),
    /** Decrypt secret file */
    'secret:decrypt': () => secret.decrypt(),
    /** Run app with pm2 */
    'pm2:app': pm2('./bin/app.js', {name: Local.APP_PROCESS_NAME}),
    /** Run backup cron with pm2 */
    'pm2:backup:dump': pm2.pon('db:dump', {name: `${Local.BACKUP_PROCESS_NAME}:dump`, cron: Local.DUMP_SCHEDULE}),
    /** Catch up to latest git */
    'git:catchup': [git('stash'), git('pull')],
    /** Fix package.json */
    'pkg:fix': npx('fixpack'),
    /** Open app in browser */
    'open:app': open(`http://localhost:${Local.NGINX_PUBLISHED_PORT}`),
    /** Generate pondoc file */
    'doc:pondoc': pondoc(__filename, 'misc/project/Pondoc.json'),
    // ----------------
    // Main Tasks
    // ----------------
    /** Run all assets tasks */
    assets: ['assets:*'],
    /** Run all struct tasks */
    struct: ['struct:mkdir', 'struct:compile', 'struct:symlink', 'struct:cp', 'struct:pkg', 'struct:render', 'struct:chmod', 'struct:json',],
    /** Run all ui tasks */
    ui: ['ui:css', 'ui:react', 'ui:browser', 'ui:browser-external', 'ui:map'],
    /** Prepare DB */
    db: ['db:setup', 'db:seed'],
    /** Run all tess */
    test: ['env:test', 'test:client', 'test:server'],
    /** Clean all */
    clean: ['clean:shim', 'clean:public', 'clean:cache'],
    /** Build all */
    build: ['struct', 'ui'],
    /** Validate all */
    validate: ['loc:validate'],
    /** Prepare project */
    prepare: [
      'secret:encrypt', 'struct', 'assets', 'docker', 'db', 'build',
      ...(isProduction() ? [] : ['pkg:fix', 'doc', 'validate'])
    ],
    /** Run watches */
    watch: ['ui:*', 'ui:*/watch'],
    /** Default for `pon` command */
    default: ['build'],
    /** Start debugging */
    debug: ['env:debug', 'build', 'debug:*'],
    /** Prepare and start on production */
    prod: ['env:prod', 'prod:compile', 'prod:db', 'start'],
    /** Setup docker infra */
    docker: ['docker:redis/run', 'docker:mysql/run', 'docker:nginx/run'],
    /** Start app as daemon */
    start: isProduction() ? ['pm2:app/start', 'pm2:backup:*/start'] : 'debug:server',
    /** Stop app as daemon */
    stop: isProduction() ? ['pm2:app/stop', 'pm2:backup:*/stop'] : [],
    /** Restart app as daemon */
    restart: ['pm2:app/restart', 'pm2:backup:*/restart'],
    /** Show app daemon status */
    show: ['pm2:app/show'],
    /** Show app daemon logs */
    logs: ['pm2:app/logs'],
    /** Update project settings with interactive shell */
    setting: () => setting.ask(),
    /** Deploy project on production */
    deploy: ['maint:on', 'stop', 'git:catchup', 'prod', 'maint:off'],
    /** Open project */
    open: 'open:*',
    /** Generate docs */
    doc: 'doc:*',
    // ----------------
    // Aliases
    // ----------------
    /** Shortcut for `test` task */
    t: 'test',
    /** Shortcut for `clean` task */
    c: 'clean',
    /** Shortcut for `build` task */
    b: 'build',
    /** Shortcut for `watch` task */
    w: 'watch',
    /** Shortcut for `debug` task */
    d: 'debug',
    /** Shortcut for `debug:server` task */
    ds: 'debug:server',
    /** Shortcut for `prod` task */
    p: 'prod',
    /** Shortcut for `open` task */
    o: 'open',
  }
)
