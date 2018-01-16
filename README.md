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
  * [Tips](#tips)
    + [Managing Docker Infra](#managing-docker-infra)
    + [Restarting Server](#restarting-server)
  * [Console to database](#console-to-database)
    + [Project Structure](#project-structure)
  * [License](#license)
  * [Links](#links)


<!-- Section from "doc/guides/00.TOC.md.hbs" End -->

<!-- Section from "doc/guides/01.Preparing.md.hbs" Start -->

<a name="section-doc-guides-01-preparing-md"></a>

Preparing
----------

Install CLI packages if you have not

```bash
$ npm i yarn pon pm2 -g
```

Then, install dependencies and build the project

```bash
$ yarn install
$ yarn prepare
```

<!-- Section from "doc/guides/01.Preparing.md.hbs" End -->

<!-- Section from "doc/guides/02.Requiements.md.hbs" Start -->

<a name="section-doc-guides-02-requiements-md"></a>

Requirements
----------

+ [Node.js &gt;&#x3D;8](https://nodejs.org/en/)
+ [Docker](https://www.docker.com/)


<!-- Section from "doc/guides/02.Requiements.md.hbs" End -->

<!-- Section from "doc/guides/10.Development.md.hbs" Start -->

<a name="section-doc-guides-10-development-md"></a>

Development
----------

### Starting dev server

```bash
# Start server and watch files to compile
pon d
```

<!-- Section from "doc/guides/10.Development.md.hbs" End -->

<!-- Section from "doc/guides/11.Production.md.hbs" Start -->

<a name="section-doc-guides-11-production-md"></a>

Production
----------

```bash

## Start production server
pon production
```

<!-- Section from "doc/guides/11.Production.md.hbs" End -->

<!-- Section from "doc/guides/20.Tips.md.hbs" Start -->

<a name="section-doc-guides-20-tips-md"></a>

Tips
-----------

### Managing Docker Infra

To show available commands,

```bash

pon -l | grep docker

```

### Restarting Server

```bash
pon stop
pon start
```

Or, just

```bash
pon restart
```

## Console to database

```bash
pon db:cli
```


### Project Structure

Directory structure of this project

| Directory Path | Description |
| ---- | ----- |
| assets | Static file directory |
| bin | Executable files |
| client | Client side scripts |
| client/client | RPC Client |
| client/scenes | Client logic without ui |
| client/shim | Generated shim files |
| client/store | Client side data store |
| client/test | Client tests |
| client/ui | User interfaces |
| conf | Configuration of project |
| doc | Documents |
| doc/guides | Guides for README |
| misc | Misc files |
| public | Public directory to serve static files. Auto-generated |
| server | Server side scripts |
| server/controllers | Controller classes to handle RPC |
| server/db | Database modules |
| server/services | Database access wrappers |
| server/env | Env dependant variables |
| server/server | HTTP Server modules |
| server/test | Server tests |
| test | Project tests |
| tmp | Temporary files. Can be deleted anytime. |
| var | Var files |


<!-- Section from "doc/guides/20.Tips.md.hbs" End -->


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
+ [Realglobe, Inc.][realglobe,_inc__url]

[pon_url]: https://github.com/realglobe-Inc/pon
[realglobe,_inc__url]: http://realglobe.jp

<!-- Links End -->
