the-demo-site
==========

<!---
This file is generated by the-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/the-labo/the-demo-site
[bd_travis_url]: http://travis-ci.org/the-labo/the-demo-site
[bd_travis_shield_url]: http://img.shields.io/travis/the-labo/the-demo-site.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/the-labo/the-demo-site
[bd_travis_com_shield_url]: https://api.travis-ci.com/the-labo/the-demo-site.svg?token=
[bd_license_url]: https://github.com/the-labo/the-demo-site/blob/master/LICENSE
[bd_npm_url]: http://www.npmjs.org/package/the-demo-site
[bd_npm_shield_url]: http://img.shields.io/npm/v/the-demo-site.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Demo site of the-framework

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/00.TOC.md" Start -->

<a name="section-doc-guides-00-t-o-c"></a>

Table of Contents
----------------

- [the-demo-site](#the-demo-site)
  * [Requirements](#requirements)
  * [Preparing](#preparing)
  * [Development](#development)
    + [Starting Development Server](#starting-development-server)
    + [Open Project In Browser](#open-project-in-browser)
  * [Production](#production)
    + [Setup Server (Ubuntu)](#setup-server-ubuntu)
    + [Setup App](#setup-app)
    + [Configure Reverse Proxy](#configure-reverse-proxy)
  * [Running Tasks](#running-tasks)
    + [Core Tasks](#core-tasks)
    + [Dev Only Tasks](#dev-only-tasks)
  * [Database](#database)
    + [Database Resource](#database-resource)
    + [Console to database](#console-to-database)
  * [E2E (End-to-End) Test](#e2e-end-to-end-test)
    + [Set Up Servers](#set-up-servers)
    + [Run E2E Test](#run-e2e-test)
  * [Trouble Shooting](#trouble-shooting)
    + [First Things You Should Try](#first-things-you-should-try)
    + [Docker Containers Seam to Be Dead](#docker-containers-seam-to-be-dead)
  * [Misc](#misc)
    + [Provided Urls](#provided-urls)
    + [Project Structure](#project-structure)
    + [What is `.*.bud` Files?](#what-is-bud-files)
    + [Configuring Secret Values](#configuring-secret-values)
  * [License](#license)
  * [Links](#links)


<!-- Section from "doc/guides/00.TOC.md" End -->

<!-- Section from "doc/guides/01.Requiements.md" Start -->

<a name="section-doc-guides-01-requiements"></a>

Requirements
----------

This project requires:

+ [Node.js &gt;&#x3D;10](https://nodejs.org/en/)
+ [Docker](https://www.docker.com/)


<!-- Section from "doc/guides/01.Requiements.md" End -->

<!-- Section from "doc/guides/02.Preparing.md" Start -->

<a name="section-doc-guides-02-preparing"></a>

Preparing
----------

Install CLI packages if you have not

```bash
# Install global dependencies
npm i -g pon pm2 jsdoc mocha
```

Then, install dependencies and build the project

```bash
# Install dependencies and trigger prepare script
npm install

```


<!-- Section from "doc/guides/02.Preparing.md" End -->

<!-- Section from "doc/guides/10.Development.md" Start -->

<a name="section-doc-guides-10-development"></a>

Development
----------

### Starting Development Server

```bash
# Start server and watch files to compile
pon debug  # Or just `pon d`
```

### Open Project In Browser

```bash
# This will the open in your browser
open open  # Or just `pon o`
```


<!-- Section from "doc/guides/10.Development.md" End -->

<!-- Section from "doc/guides/11.Production.md" Start -->

<a name="section-doc-guides-11-production"></a>

Production
----------

### Setup Server (Ubuntu)

Execute [./misc/setup/setup_ubuntu.sh](./misc/setup/setup_ubuntu.sh) to install softwares like git, node, nginx, etc.

### Setup App

```bash

# Setup env
export NODE_ENV=production

# Where you checkout the project
cd /opt/apps/the-demo-site

# Install dependencies and run prepare scripts
yarn install


# Interactive shell to configure local values
pon setting


# Start production server
pon production
```

### Configure Reverse Proxy

```bash

# Setup cert files for https
./misc/deploy/01.cert.sh

# Apply https setting for nginx
./misc/deploy/02.vhost.sh

# Configure cert renew with cron
./misc/deploy/03.crontabs.sh

```


<!-- Section from "doc/guides/11.Production.md" End -->

<!-- Section from "doc/guides/20.Tasks.md" Start -->

<a name="section-doc-guides-20-tasks"></a>

Running Tasks
-----------

This project uses [Pon][pon_url] as a task runner.

Just pass task name to run.

```bash
pon <taskName>
```


### Core Tasks

Tasks defined in [Ponfile.js]('./Ponfile.js')

| TaskName | Description | Command |
| -------- | ----------- | ------- |
| assert:not-prod | Make sure that not production | `pon assert:not-prod` |
| assets | Run all assets tasks | `pon assets` |
| assets:install | Install asset files | `pon assets:install` |
| assets:markdown | Render markdown assets | `pon assets:markdown` |
| b | Shortcut for `build` task | `pon b` |
| build | Build all | `pon build` |
| check | Check all | `pon check` |
| db | Prepare DB | `pon db` |
| db:cli | Open database cli | `pon db:cli` |
| db:drop | Drop database | `pon db:drop` |
| db:dump | Dump data | `pon db:dump` |
| db:load | Load data from dum | `pon db:load` |
| db:migrate | Migrate data | `pon db:migrate` |
| db:reset | Drop and setup database again | `pon db:reset` |
| db:seed | Generate test data | `pon db:seed` |
| db:setup | Setup database | `pon db:setup` |
| default | Default for `pon` command | `pon default` |
| deploy | Deploy project on production | `pon deploy` |
| doc | Generate docs | `pon doc` |
| docker | Setup docker infra | `pon docker` |
| docker:mysql | Prepare mysql docker container | `pon docker:mysql` |
| docker:nginx | Prepare nginx docker container | `pon docker:nginx` |
| docker:redis | Prepare redis docker container | `pon docker:redis` |
| env:debug | Set env variables for debug | `pon env:debug` |
| env:prod | Set env variables for production | `pon env:prod` |
| env:test | Set env variables for test | `pon env:test` |
| git:catchup | Catch up to latest git | `pon git:catchup` |
| git:tags | Fetch tags from git | `pon git:tags` |
| loc:print | Print locale settings | `pon loc:print` |
| local:print | Print local settings | `pon local:print` |
| logs | Show app daemon logs | `pon logs` |
| maint:off | Disable maintenance mode | `pon maint:off` |
| maint:on | Enable maintenance mode | `pon maint:on` |
| p | Shortcut for `prod` task | `pon p` |
| pkg:fix | Fix package.json | `pon pkg:fix` |
| pkg:install | Install packages | `pon pkg:install` |
| pkg:install:force | Install packages forcefully | `pon pkg:install:force` |
| pkg:link | Link self packages | `pon pkg:link` |
| pkg:upg | Upgrade packages package.json | `pon pkg:upg` |
| pm2:app | Run app with pm2 | `pon pm2:app` |
| pm2:backup:dump | Run backup cron with pm2 | `pon pm2:backup:dump` |
| pre | Shortcut for 'prepare` task | `pon pre` |
| prepare | Prepare project | `pon prepare` |
| prod | Prepare and start on production | `pon prod` |
| prod:compile | Compile files for production | `pon prod:compile` |
| prod:css | Compile css files for production | `pon prod:css` |
| prod:db | Prepare database for production | `pon prod:db` |
| prod:js | Compile js files for production | `pon prod:js` |
| prod:map | Delete source map files for production | `pon prod:map` |
| ps:debug | Process check for debug | `pon ps:debug` |
| ps:e2e | Process check for e2e | `pon ps:e2e` |
| restart | Restart app as daemon | `pon restart` |
| secret:dec | Decrypt secret file | `pon secret:dec` |
| secret:enc | Encrypt secret file | `pon secret:enc` |
| setting | Update project settings with interactive shell | `pon setting` |
| show | Show app daemon status | `pon show` |
| start | Start app as daemon | `pon start` |
| stop | Stop app as daemon | `pon stop` |
| struct | Run all struct tasks | `pon struct` |
| struct:chmod | Change file permissions | `pon struct:chmod` |
| struct:compile | Compile files | `pon struct:compile` |
| struct:cp | Execute file copy | `pon struct:cp` |
| struct:mkdir | Generate project directories | `pon struct:mkdir` |
| struct:pkg | Prepare sub packages | `pon struct:pkg` |
| struct:render | Render coz templates | `pon struct:render` |
| ui | Run all ui tasks | `pon ui` |
| ui:browser | Bundle browser script | `pon ui:browser` |
| ui:css | Compile stylesheets | `pon ui:css` |
| ui:css/watch | Run css watch | `pon ui:css/watch` |
| ui:react | Compile react components | `pon ui:react` |


### Dev Only Tasks

Tasks defined in [Ponfile.dev.js]('./Ponfile.dev.js')

| TaskName | Description | Command |
| -------- | ----------- | ------- |
| c | Shortcut for `clean` task | `pon c` |
| clean | Clean all | `pon clean` |
| clean:cache | Cleanup cache files | `pon clean:cache` |
| clean:public | Cleanup public files | `pon clean:public` |
| clean:shim | Cleanup shim files | `pon clean:shim` |
| d | Shortcut for `debug` task | `pon d` |
| debug | Start debugging | `pon debug` |
| debug:server | Run server for debug | `pon debug:server` |
| debug:watch | Watch files for debug | `pon debug:watch` |
| doc:pondoc | Generate pondoc file | `pon doc:pondoc` |
| doc:pondoc:dev | Generate pondoc file | `pon doc:pondoc:dev` |
| ds | Shortcut for `debug:server` task | `pon ds` |
| e | Shortcut for `e2e` task | `pon e` |
| e2e | Run e2e test | `pon e2e` |
| e2e:install | Install drivers for E2E | `pon e2e:install` |
| e2e:listen | Listen for E2E tests | `pon e2e:listen` |
| e2e:story | Run stories for E2E tests | `pon e2e:story` |
| el | Shortcut for `e2e:listen` task | `pon el` |
| f | Shortcut for `format` task | `pon f` |
| format | Format source codes | `pon format` |
| format:client | Format client files | `pon format:client` |
| format:conf | Format conf files | `pon format:conf` |
| format:e2e | Format e2e files | `pon format:e2e` |
| format:json | Format json files | `pon format:json` |
| format:misc | Format misc files | `pon format:misc` |
| format:server | Format server files | `pon format:server` |
| git:changelog | Generate changelog file | `pon git:changelog` |
| icon:gen | Generate icons | `pon icon:gen` |
| l | Shortcut for `lint` task | `pon l` |
| lint | Lint all | `pon lint` |
| lint:loc | Validate locales | `pon lint:loc` |
| lint:rules | Lint by rules | `pon lint:rules` |
| o | Shortcut for `open` task | `pon o` |
| open | Open project | `pon open` |
| open:app | Open app in browser | `pon open:app` |
| open:repo | Open homepage field in package.json | `pon open:repo` |
| or | Shortcut for `open` task | `pon or` |
| prepare | Prepare project | `pon prepare` |
| start | Start server | `pon start` |
| stop | Stop server | `pon stop` |
| t | Shortcut for `test` task | `pon t` |
| test | Run all tess | `pon test` |
| test:client | Run client tests | `pon test:client` |
| test:server | Run server tests | `pon test:server` |
| test:support | Check compatibility | `pon test:support` |
| u | Shortcut for `upgrade` task | `pon u` |
| upgrade | Upgrade package | `pon upgrade` |
| w | Shortcut for `watch` task | `pon w` |
| watch | Run watches | `pon watch` |

For more information, try `pon -l`


<!-- Section from "doc/guides/20.Tasks.md" End -->

<!-- Section from "doc/guides/21.Database.md" Start -->

<a name="section-doc-guides-21-database"></a>

Database
-----------

### Database Resource

* [Alias Resource](./doc/database/Resources.md#Alias-Resource)
* [History Resource](./doc/database/Resources.md#History-Resource)
* [Profile Resource](./doc/database/Resources.md#Profile-Resource)
* [Role Resource](./doc/database/Resources.md#Role-Resource)
* [Sign Resource](./doc/database/Resources.md#Sign-Resource)
* [Token Resource](./doc/database/Resources.md#Token-Resource)
* [User Resource](./doc/database/Resources.md#User-Resource)


### Console to database

```bash
pon db:cli
```

In the console, you can access database resources via [ClayResource][clay_resource_a_p_i_url] class


**Terminal Example**

```bash
Welcome to the-db prompt!
DB Env: { dialect: 'mysql', host: 'localhost', port: '6002', database: 'thedemosite_dev', username: 'thedemosite_dev', root_username: 'root', hooks: null }
DB Resources: [ 'TheDBSchema', 'TheDBLog', 'Alias', 'History', 'Profile', 'Role', 'Sign', 'User' ]

the-db> User.count()  # Evaluate One-line Javascript in the terminal
106
the-db> (await User.first()).name  # Using async interface
'superadmin-71d5acfe'
the-db>
```


<!-- Section from "doc/guides/21.Database.md" End -->

<!-- Section from "doc/guides/30.E2E.md" Start -->

<a name="section-doc-guides-30-e2-e"></a>

E2E (End-to-End) Test
-----------

### Set Up Servers

Run app server with debug mode

```bash
pon debug:server # Or just `pon ds`
```

Then, run e2e server (In other tab)

```bash
pon e2e:listen # Or just `pon el`
```


### Run E2E Test

To run all tests, 

```bash
pon e2e # Or just `pon e`
```


To run single tests,

```bash
# List available test stories
pon -l e2e:story

# Example to run one of stories
pon e2e:story/signInOut 
```




<!-- Section from "doc/guides/30.E2E.md" End -->

<!-- Section from "doc/guides/90.Trouble.md" Start -->

<a name="section-doc-guides-90-trouble"></a>

Trouble Shooting
-----------


### First Things You Should Try

When something goes funny, the first thing to do is `clean` and `build`

```bash

# Clean up files and build again (aka. `pon c b`)
pon clean build

```

### Docker Containers Seam to Be Dead

To Re-create docker containers,

```bash

# Remove docker containers and restart again
pon docker:*/remove docker

```

<!-- Section from "doc/guides/90.Trouble.md" End -->

<!-- Section from "doc/guides/99.Misc.md" Start -->

<a name="section-doc-guides-99-misc"></a>

Misc
-----------

### Provided Urls

* `/about/app`
* `/about/privacy-policy`
* `/about/terms-of-use`
* `/account/mypage`
* `/account/password`
* `/account/profile`
* `/account/quit`
* `/account/recover/reset`
* `/account/recover/send`
* `/account/verify/confirm`
* `/admin`
* `/admin/users`
* `/a/:key`
* `/build/bundle.css`
* `/css/flatpickr.min.css`
* `/css/fontawesome-all.css`
* `/css/normalize.css`
* `/css/theme.css`
* `/errors/forbidden`
* `/errors/not-found`
* `/images/app-icon.png`
* `/build/bundle.js`
* `/build/external.js`
* `/RootServiceWorker.js`
* `/js/es5-shim.min.js`
* `/manifest/:lang/manifest.json`
* `/v11.0.12`
* `/v11.0.12/bundle.css`
* `/v11.0.12/bundle.js`
* `/v11.0.12/external.js`
* `/sign/please`
* `/sign/signin`
* `/sign/signout`
* `/sign/signup`
* `/`


### Project Structure

Directory structure of this project

| Directory Path | Description |
| ---- | ----- |
| [assets](./assets) | Static file directory |
| [bin](./bin) | Executable files |
| [client](./client) | Client side scripts |
| [client/client](./client/client) | RPC Client |
| [client/scenes](./client/scenes) | Client logic without ui |
| [client/shim](./client/shim) | Generated shim files |
| [client/store](./client/store) | Client side data store |
| [client/test](./client/test) | Client tests |
| [client/ui](./client/ui) | User interfaces |
| [conf](./conf) | Configuration of project |
| [doc](./doc) | Documents |
| [doc/guides](./doc/guides) | Guides for README |
| [e2e](./e2e) | End-to-end testing scripts |
| [misc](./misc) | Misc files |
| [public](./public) | Public directory to serve static files. Auto-generated |
| [server](./server) | Server side scripts |
| [server/controllers](./server/controllers) | Controller classes to handle RPC |
| [server/db](./server/db) | Database modules |
| [server/env](./server/env) | Env dependant variables |
| [server/server](./server/server) | HTTP Server modules |
| [server/services](./server/services) | Database access wrappers |
| [server/test](./server/test) | Server tests |
| [test](./test) | Project tests |
| [tmp](./tmp) | Temporary files. Can be deleted anytime. |
| [var](./var) | Var files |




### What is `.*.bud` Files?

This project contains a lot of `.*.bud` files, which is used by [coz](https://github.com/coz-labo/coz#coz) file generator.
Bud file tells coz to how files should to generate, like path,tmpl,data,mode, etc.


### Configuring Secret Values

Secret values are stored in [secrets.json](./secrets.json)
These values can be encoded/decoded by pon tasks

```bash
# Decode values inside secrets.json
pon secret:dec
```

```bash
# Encode values inside secrets.json
pon secret:enc
```




<!-- Section from "doc/guides/99.Misc.md" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [Apache-2.0 License](https://github.com/the-labo/the-demo-site/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [Pon][pon_url]
+ [ClayResource API][clay_resource_a_p_i_url]

[pon_url]: https://github.com/realglobe-Inc/pon
[clay_resource_a_p_i_url]: https://github.com/realglobe-Inc/clay-resource/blob/master/doc/api/api.md#clay-resource

<!-- Links End -->
