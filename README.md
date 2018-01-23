the-demo-site
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/the-labo/the-demo-site
[bd_travis_url]: http://travis-ci.org/the-labo/the-demo-site
[bd_travis_shield_url]: http://img.shields.io/travis/the-labo/the-demo-site.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/the-labo/the-demo-site
[bd_travis_com_shield_url]: https://api.travis-ci.com/the-labo/the-demo-site.svg?token=
[bd_license_url]: https://github.com/the-labo/the-demo-site/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/the-labo/the-demo-site
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/the-labo/the-demo-site.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/the-labo/the-demo-site.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/the-labo/the-demo-site
[bd_gemnasium_shield_url]: https://gemnasium.com/the-labo/the-demo-site.svg
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

<!-- Section from "doc/guides/00.TOC.md.hbs" Start -->

<a name="section-doc-guides-00-t-o-c-md"></a>

Table of Contents
----------------

- [the-demo-site](#the-demo-site)
  * [Preparing](#preparing)
  * [Requirements](#requirements)
  * [Development](#development)
    + [Starting dev server](#starting-dev-server)
  * [Production](#production)
    + [Setup Server (Ubuntu)](#setup-server-ubuntu)
    + [Setup App](#setup-app)
    + [Configure Reverse Proxy](#configure-reverse-proxy)
  * [Running Tasks](#running-tasks)
    + [Available Tasks](#available-tasks)
  * [Misc](#misc)
    + [Console to database](#console-to-database)
    + [Project Structure](#project-structure)
    + [Trouble Shooting](#trouble-shooting)
  * [License](#license)
  * [Links](#links)


<!-- Section from "doc/guides/00.TOC.md.hbs" End -->

<!-- Section from "doc/guides/01.Requiements.md.hbs" Start -->

<a name="section-doc-guides-01-requiements-md"></a>

Requirements
----------

This project requires:

+ [Node.js &gt;&#x3D;8](https://nodejs.org/en/)
+ [Docker](https://www.docker.com/)


<!-- Section from "doc/guides/01.Requiements.md.hbs" End -->

<!-- Section from "doc/guides/02.Preparing.md.hbs" Start -->

<a name="section-doc-guides-02-preparing-md"></a>

Preparing
----------

Install CLI packages if you have not

```bash
# Install global dependencies
npm i -g yarn pon pm2 jsdoc mocha
```

Then, install dependencies and build the project

```bash
# Install dependencies
yarn install

# Prepare project (Start up docker, create db, compile files, .etc)
yarn prepare
```

<!-- Section from "doc/guides/02.Preparing.md.hbs" End -->

<!-- Section from "doc/guides/10.Development.md.hbs" Start -->

<a name="section-doc-guides-10-development-md"></a>

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


<!-- Section from "doc/guides/10.Development.md.hbs" End -->

<!-- Section from "doc/guides/11.Production.md.hbs" Start -->

<a name="section-doc-guides-11-production-md"></a>

Production
----------

### Setup Server (Ubuntu)

Execute [./misc/setup/setup_ubuntu.sh](./misc/setup/setup_ubuntu.sh) to install softwares like *git*, *node*, *nginx*, etc.

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


<!-- Section from "doc/guides/11.Production.md.hbs" End -->

<!-- Section from "doc/guides/20.Tasks.md.hbs" Start -->

<a name="section-doc-guides-20-tasks-md"></a>

Running Tasks
-----------

This project uses [Pon][pon_url] as a task runner.

Just pass task name to run.

```bash
pon <taskName>
```


### Available Tasks

| TaskName | Description | Command |
| -------- | ----------- | -------  |
| assert:not-prod | Make sure that not production | `pon assert:not-prod` |
| assets:install | Install asset files | `pon assets:install` |
| assets:markdown | Render markdown assets | `pon assets:markdown` |
| clean:cache | Cleanup cache files | `pon clean:cache` |
| clean:public | Cleanup public files | `pon clean:public` |
| clean:shim | Cleanup shim files | `pon clean:shim` |
| db:cli | Open database cli | `pon db:cli` |
| db:drop | Drop database | `pon db:drop` |
| db:dump | Dump data | `pon db:dump` |
| db:load | Load data from dum | `pon db:load` |
| db:migrate | Migrate data | `pon db:migrate` |
| db:reset | Drop and setup database again | `pon db:reset` |
| db:seed | Generate test data | `pon db:seed` |
| db:setup | Setup database | `pon db:setup` |
| debug:server | Run server for debug | `pon debug:server` |
| debug:watch | Watch files for debug | `pon debug:watch` |
| doc:pondoc | Generate pondoc file | `pon doc:pondoc` |
| docker:mysql | Prepare mysql docker container | `pon docker:mysql` |
| docker:nginx | Prepare nginx docker container | `pon docker:nginx` |
| docker:redis | Prepare redis docker container | `pon docker:redis` |
| env:debug | Set env variables for debug | `pon env:debug` |
| env:prod | Set env variables for production | `pon env:prod` |
| env:test | Set env variables for test | `pon env:test` |
| git:catchup | Catch up to latest git | `pon git:catchup` |
| icon:generate | Generate icons | `pon icon:generate` |
| loc:print | Print locale settings | `pon loc:print` |
| loc:validate | Validate locales | `pon loc:validate` |
| maint:off | Disable maintenance mode | `pon maint:off` |
| maint:on | Enable maintenance mode | `pon maint:on` |
| open:app | Open app in browser | `pon open:app` |
| pkg:fix | Fix package.json | `pon pkg:fix` |
| pm2:app | Run app with pm2 | `pon pm2:app` |
| pm2:backup:dump | Run backup cron with pm2 | `pon pm2:backup:dump` |
| prod:compile | Compile files for production | `pon prod:compile` |
| prod:css | Compile css files for production | `pon prod:css` |
| prod:db | Prepare database for production | `pon prod:db` |
| prod:js | Compile js files for production | `pon prod:js` |
| prod:map | Delete source map files for production | `pon prod:map` |
| ps:debug | Check another process exists | `pon ps:debug` |
| secret:decrypt | Decrypt secret file | `pon secret:decrypt` |
| secret:encrypt | Encrypt secret file | `pon secret:encrypt` |
| struct:chmod | Change file permissions | `pon struct:chmod` |
| struct:compile | Compile files | `pon struct:compile` |
| struct:cp | Execute file copy | `pon struct:cp` |
| struct:json | Format json files | `pon struct:json` |
| struct:mkdir | Generate project directories | `pon struct:mkdir` |
| struct:pkg | Prepare sub packages | `pon struct:pkg` |
| struct:render | Render coz templates | `pon struct:render` |
| struct:symlink | Generate symbolic links | `pon struct:symlink` |
| test:client | Run client tests | `pon test:client` |
| test:server | Run server tests | `pon test:server` |
| ui:browser-external | Bundle external browser script | `pon ui:browser-external` |
| ui:browser | Bundle browser script | `pon ui:browser` |
| ui:css | Compile stylesheets | `pon ui:css` |
| ui:css/watch | Run css watch | `pon ui:css/watch` |
| ui:map | Extract map files | `pon ui:map` |
| ui:react | Compile react components | `pon ui:react` |
| assets | Run all assets tasks | `pon assets` |
| b | Shortcut for `build` task | `pon b` |
| build | Build all | `pon build` |
| c | Shortcut for `clean` task | `pon c` |
| clean | Clean all | `pon clean` |
| d | Shortcut for `debug` task | `pon d` |
| db | Prepare DB | `pon db` |
| debug | Start debugging | `pon debug` |
| default | Default for `pon` command | `pon default` |
| deploy | Deploy project on production | `pon deploy` |
| doc | Generate docs | `pon doc` |
| docker | Setup docker infra | `pon docker` |
| ds | Shortcut for `debug:server` task | `pon ds` |
| logs | Show app daemon logs | `pon logs` |
| o | Shortcut for `open` task | `pon o` |
| open | Open project | `pon open` |
| p | Shortcut for `prod` task | `pon p` |
| prepare | Prepare project | `pon prepare` |
| prod | Prepare and start on production | `pon prod` |
| restart | Restart app as daemon | `pon restart` |
| setting | Update project settings with interactive shell | `pon setting` |
| show | Show app daemon status | `pon show` |
| start | Start app as daemon | `pon start` |
| stop | Stop app as daemon | `pon stop` |
| struct | Run all struct tasks | `pon struct` |
| t | Shortcut for `test` task | `pon t` |
| test | Run all tess | `pon test` |
| ui | Run all ui tasks | `pon ui` |
| validate | Validate all | `pon validate` |
| w | Shortcut for `watch` task | `pon w` |
| watch | Run watches | `pon watch` |


For more information, try `pon -l`

<!-- Section from "doc/guides/20.Tasks.md.hbs" End -->

<!-- Section from "doc/guides/90.Trouble.md.hbs" Start -->

<a name="section-doc-guides-90-trouble-md"></a>

Trouble Shooting
-----------


### First Things You Try

When something goes funny, first thing you do clean build

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

<!-- Section from "doc/guides/90.Trouble.md.hbs" End -->

<!-- Section from "doc/guides/99.Misc.md.hbs" Start -->

<a name="section-doc-guides-99-misc-md"></a>

Misc
-----------

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
| [misc](./misc) | Misc files |
| [public](./public) | Public directory to serve static files. Auto-generated |
| [server](./server) | Server side scripts |
| [server/controllers](./server/controllers) | Controller classes to handle RPC |
| [server/db](./server/db) | Database modules |
| [server/services](./server/services) | Database access wrappers |
| [server/env](./server/env) | Env dependant variables |
| [server/server](./server/server) | HTTP Server modules |
| [server/test](./server/test) | Server tests |
| [test](./test) | Project tests |
| [tmp](./tmp) | Temporary files. Can be deleted anytime. |
| [var](./var) | Var files |



<!-- Section from "doc/guides/99.Misc.md.hbs" End -->


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
[clay_resource_a_p_i_url]: https://github.com/realglobe-Inc/clay-resource/blob/master/doc/api/api.md#clay-resource552

<!-- Links End -->
