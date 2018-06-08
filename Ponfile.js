/**
 * Pon tasks
 * @file Ponfile
 * @see https://github.com/realglobe-Inc/pon
 */
'use strict'

const pon = require('pon')
const {
  command: {spawn: {git, npm, npx}},
  coz,
  env,
  fs: {chmod, concat, cp, del, mkdir, symlink, write},
} = require('pon-task-basic')
const db = require('pon-task-db')
const {mysql, nginx, redis} = require('pon-task-docker')
const es = require('pon-task-es')
const md = require('pon-task-md')
const pm2 = require('pon-task-pm2')
const {browser, ccjs, css, map, react} = require('pon-task-web')
const theAssets = require('the-assets')
const theBin = require('the-bin/pon')
const thePS = require('the-ps/pon')
const {Urls, locales} = require('./conf')
const Local = require('./Local')
const ExternalIgnorePatch = require('./misc/browser/ExternalIgnorePatch')
const Externals = require('./misc/browser/Externals')
const Containers = require('./misc/docker/Containers')
const Bins = require('./misc/project/Bins')
const Directories = require('./misc/project/Directories')
const Pondoc = require('./misc/project/Pondoc')
const migration = require('./server/db/migration')
const {envify} = browser.transforms
const {secret, setting} = Local
const createDB = () => require('./server/db/create').forTask()

module.exports = pon(
  /** @module tasks */
  {

    // -----------------------------------
    // Meta info
    // -----------------------------------
    ...{
      $cwd: __dirname,
      $doc: Pondoc,
    },

    // -----------------------------------
    // Sub Tasks for Assert
    // -----------------------------------
    ...{
      /** Make sure that not production */
      'assert:not-prod': env.notFor('production'),
    },

    // -----------------------------------
    // Sub Tasks for Assets
    // -----------------------------------
    ...{
      /** Install asset files */
      'assets:install': () => theAssets().installTo('assets', {copy: true}),
      /** Render markdown assets */
      'assets:markdown': md('assets/markdowns', 'public/partials', {
        vars: {...locales},
      }),
    },

    // -----------------------------------
    // Sub Tasks for Check
    // -----------------------------------
    ...{
      'check:bin': theBin.test(Bins),
    },

    // -----------------------------------
    // Sub Tasks for Database
    // -----------------------------------
    ...{
      /** Open database cli */
      'db:cli': () => createDB().cli(),
      /** Drop database */
      'db:drop': ['assert:not-prod', db.drop(createDB)],
      /** Dump data */
      'db:dump': db.dump(createDB, 'var/backup/dump', {max: Local.DUMP_ROTATION}),
      /** Load data from dum */
      'db:load': db.load.ask(createDB),
      /** Migrate data */
      'db:migrate': db.migrate(createDB, migration, {snapshot: 'var/migration/snapshots'}),
      /** Drop and setup database again */
      'db:reset': ['assert:not-prod', 'db:drop', 'db:setup', 'db:seed'],
      /** Generate test data */
      'db:seed': db.seed(createDB, 'server/db/seeds/:env/*.seed.js'),
      /** Setup database */
      'db:setup': db.setup(createDB),
    },

    // -----------------------------------
    // Sub Tasks for Docker
    // -----------------------------------
    ...{
      /** Prepare mysql docker container */
      'docker:mysql': mysql(Containers.mysql.name, Containers.mysql.options),
      /** Prepare nginx docker container */
      'docker:nginx': nginx(Containers.nginx.name, Containers.nginx.options),
      /** Prepare redis docker container */
      'docker:redis': redis(Containers.redis.name, Containers.redis.options),
    },

    // -----------------------------------
    // Sub Tasks for Environment
    // -----------------------------------
    ...{
      /** Set env variables for debug */
      'env:debug': env('development', {DEBUG: 'app:*', ...Local}),
      /** Set env variables for production */
      'env:prod': env('production'),
      /** Set env variables for test */
      'env:test': env('test'),
    },

    // -----------------------------------
    // Sub Tasks for Git
    // -----------------------------------
    ...{
      /** Catch up to latest git */
      'git:catchup': [git('stash'), git('pull')],
    },

    // -----------------------------------
    // Sub Tasks for Locales
    // -----------------------------------
    ...{
      /** Print locale settings */
      'loc:print': () => console.log(locales.toCompound()),
    },

    // -----------------------------------
    // Sub Tasks for Local Config
    // -----------------------------------
    ...{
      /** Print local settings */
      'local:print': () => Local.print(),
    },

    // -----------------------------------
    // Sub Tasks for Maintenance
    // -----------------------------------
    ...{
      /** Disable maintenance mode */
      'maint:off': del('public/status/maintenance'),
      /** Enable maintenance mode */
      'maint:on': write('public/status/maintenance'),
    },

    // -----------------------------------
    // Sub Tasks for Package
    // -----------------------------------
    ...{
      /** Fix package.json */
      'pkg:fix': npx('fixpack'),
      /** Install packages */
      'pkg:install': npm('install', '--ignore-scripts'),
      /** Install packages forcefully */
      'pkg:install:force': npm('install', '--ignore-scripts --force'),
      /** Link self packages */
      'pkg:link': symlink({
        'Local.js': 'node_modules/@self/Local.js',
        'assets/data': 'node_modules/@self/data',
        'client': 'node_modules/@self/client',
        'shim/conf': 'node_modules/@self/conf',
        'shim/utils': 'node_modules/@self/utils',
      }, {force: true}),
      /** Upgrade packages package.json */
      'pkg:upg': npm('upgrade', '--ignore-scripts'),
    },

    // -----------------------------------
    // Sub Tasks for PM2
    // -----------------------------------
    ...{
      /** Run app with pm2 */
      'pm2:app': pm2('./bin/app.js', {name: Local.APP_PROCESS_NAME}),
      /** Run backup cron with pm2 */
      'pm2:backup:dump': pm2.pon('db:dump', {cron: Local.DUMP_SCHEDULE, name: `${Local.BACKUP_PROCESS_NAME}:dump`}),
    },

    // -----------------------------------
    // Sub Tasks for Production
    // -----------------------------------
    ...{
      /** Compile files for production */
      'prod:compile': ['env:prod', 'build', 'prod:map', 'prod:css', 'prod:js',],
      /** Compile css files for production */
      'prod:css': css.minify([
        `public${Urls.CSS_BUNDLE_URL}`,
      ], `public${Urls.PRODUCTION_CSS_URL}`),
      /** Prepare database for production */
      'prod:db': ['env:prod', 'db'],
      /** Compile js files for production */
      'prod:js': ccjs([
        `public${Urls.JS_EXTERNAL_URL}`,
        `public${Urls.JS_BUNDLE_URL}`
      ], `public${Urls.PRODUCTION_JS_URL}`),
      /** Delete source map files for production */
      'prod:map': del('public/**/*.map'),
    },

    // -----------------------------------
    // Sub Tasks for Process
    // -----------------------------------
    ...{
      /** Process check for debug */
      'ps:debug': thePS('var/app/debug.pid'),
      /** Process check for e2e */
      'ps:e2e': thePS('var/app/e2e.pid'),
    },

    // -----------------------------------
    // Sub Tasks for Secret
    // -----------------------------------
    ...{
      /** Decrypt secret file */
      'secret:dec': () => secret.decrypt(),
      /** Encrypt secret file */
      'secret:enc': () => secret.encrypt(),
    },

    // -----------------------------------
    // Sub Tasks for Structure
    // -----------------------------------
    ...{
      /** Change file permissions */
      'struct:chmod': chmod({
        '.githooks/**/*.js': '577',
        'bin/**/*.*': '577',
        'misc/**/*.sh': '577',
        'misc/scripts/*.*': '577',
      }),
      /** Compile files */
      'struct:compile': [
        es('conf', 'shim/conf', {sourceRoot: '../../../../conf'}),
        es('utils', 'shim/utils', {sourceRoot: '../../../../conf'}),
      ],
      /** Execute file copy */
      'struct:cp': cp({
        'assets/html/server-error': 'public/server-error',
        'assets/images': 'public/images',
        'assets/js': 'public/js',
        'assets/manifest': 'public/manifest',
        'assets/mocks': 'public/mocks',
        'assets/text': 'public',
        'assets/webfonts': 'public/webfonts',
      }, {force: true}),
      /** Generate project directories */
      'struct:mkdir': mkdir([
        ...Object.keys(Directories)
      ]),
      /** Prepare sub packages */
      'struct:pkg': [
        cp({
          'package.json': 'shim/package.json',
        }, {force: true}),
      ],
      /** Render coz templates */
      'struct:render': [
        coz([
          '+(conf|client|server)/**/.index.*.bud',
          '+(assets|e2e|bin|client|conf|doc|misc|server|test|utils)/**/.*.bud',
          '.*.bud'
        ])
      ],
    },

    // -----------------------------------
    // Sub Tasks for UI
    // -----------------------------------
    ...{
      /** Bundle browser script */
      'ui:browser': env.dynamic(({isProduction}) =>
        browser('client/shim/ui/entrypoint.js', `public${Urls.JS_BUNDLE_URL}`, {
          externals: Externals,
          fullPaths: !isProduction(),
          transforms: [envify(process.env)],
          version: Local.APP_VERSION,
          watchTargets: 'client/shim/**/*.js',
        }), {sub: ['watch', 'deps']}
      ),
      /** Bundle external browser script */
      'ui:browser-external': env.dynamic(({isProduction}) =>
        browser('client/shim/ui/externals.js', `public${Urls.JS_EXTERNAL_URL}`, {
          fullPaths: !isProduction(),
          ignores: [
            // TODO remove patch
            ...ExternalIgnorePatch({isProduction}),
          ],
          requires: Externals,
          skipWatching: true,
          transforms: [envify(process.env)],
          version: Local.APP_VERSION,
          watchDelay: 300,
        }), {sub: ['deps']}
      ),
      /** Compile stylesheets */
      'ui:css': [
        css('client/ui', 'client/shim/ui', {
          inlineMap: true,
          modules: true,
          pattern: ['*.pcss', '+(stateful|stateless|views|layouts|wrappers|components)/**/*.pcss'],
        }),
        concat([
          'client/shim/ui/**/*.css',
          'client/ui/base.pcss',
          'client/ui/constants/variables.pcss'
        ], 'public/build/bundle.pcss', {}),
        css('public/build', 'public/build', {pattern: '*.pcss'}),
        css('assets/css', 'public/css', {pattern: '*.css'}),
      ],
      /** Run css watch */
      'ui:css/watch': 'ui:css/*/watch',
      /** Extract map files */
      'ui:map': map('public', 'public', {pattern: '**/*.js', watchDelay: 400}),
      /** Compile react components */
      'ui:react': react('client', 'client/shim', {
        extractCss: `client/shim/ui/bundle.pcss`,
        pattern: ['*.js', '*.jsx', '!(shim)/**/+(*.jsx|*.js|*.json)'],
        sourceRoot: '..',
        watchTargets: 'client/ui/**/*.pcss',
      }),
      'ui:workers': env.dynamic(({isProduction}) =>
        browser.all('client/shim/workers', `public`, {
          fullPaths: !isProduction(),
          pattern: '*Worker.js',
          transforms: [envify(process.env)],
          version: Local.APP_VERSION,
          watchTargets: 'client/shim/workers/*.js',
        }), {sub: ['watch', 'deps']}
      ),
    },

    // -----------------------------------
    // Main Tasks
    // -----------------------------------
    ...{
      /** Run all assets tasks */
      assets: ['assets:*'],
      /** Build all */
      build: ['struct:compile', 'pkg:link', 'struct', 'format', 'ui'],
      /** Check all */
      check: ['check:*'],
      /** Prepare DB */
      db: ['db:setup', 'db:seed'],
      /** Default for `pon` command */
      default: ['build'],
      /** Deploy project on production */
      deploy: ['maint:on', 'stop', 'git:catchup', 'prod', 'maint:off'],
      /** Generate docs */
      doc: 'doc:*',
      /** Setup docker infra */
      docker: ['docker:redis/run', 'docker:mysql/run', 'docker:nginx/run'],
      /** Show app daemon logs */
      logs: ['pm2:app/logs'],
      /** Prepare project */
      prepare: [
        'check',
        'struct:compile',
        'pkg:link',
        'secret:enc',
        'struct',
        'assets',
        'docker',
        'db',
        'build',
      ],
      /** Prepare and start on production */
      prod: ['env:prod', 'prod:compile', 'prod:db', 'start'],
      /** Restart app as daemon */
      restart: ['pm2:app/restart', 'pm2:backup:*/restart'],
      /** Update project settings with interactive shell */
      setting: () => setting.ask(),
      /** Show app daemon status */
      show: ['pm2:app/show'],
      /** Start app as daemon */
      start: ['pm2:app/start', 'pm2:backup:*/start'],
      /** Stop app as daemon */
      stop: ['pm2:app/stop', 'pm2:backup:*/stop'],
      /** Run all struct tasks */
      struct: ['struct:mkdir', 'struct:compile', 'struct:cp', 'struct:pkg', 'struct:render', 'struct:chmod',],
      /** Run all ui tasks */
      ui: ['ui:css', 'ui:react', 'ui:browser', 'ui:browser-external', 'ui:workers', 'ui:map'],
    },

    // -----------------------------------
    // Aliases
    // -----------------------------------
    ...{
      /** Shortcut for `build` task */
      b: 'build',
      /** Shortcut for `prod` task */
      p: 'prod',
      /** Shortcut for 'prepare` task */
      pre: 'prepare',
    },
  }
)
