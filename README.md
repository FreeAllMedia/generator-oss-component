# generator-oss-component for Yeoman

[![npm version](https://img.shields.io/npm/v/generator-oss-component.svg)](https://www.npmjs.com/package/generator-oss-component) [![npm downloads](https://img.shields.io/npm/dm/generator-oss-component.svg)](https://www.npmjs.com/package/generator-oss-component)

[![Build Status](https://travis-ci.org/FreeAllMedia/generator-oss-component.png?branch=master)](https://travis-ci.org/FreeAllMedia/generator-oss-component) [![Test Coverage](https://codeclimate.com/repos/557bdf9e695680585b007d4e/badges/536e157dec354dc8c8fd/coverage.svg)](https://codeclimate.com/repos/557bdf9e695680585b007d4e/coverage) [![Code Climate](https://codeclimate.com/repos/557bdf9e695680585b007d4e/badges/536e157dec354dc8c8fd/gpa.svg)](https://codeclimate.com/repos/557bdf9e695680585b007d4e/feed)

[![Dependency Status](https://david-dm.org/FreeAllMedia/generator-oss-component.png?theme=shields.io)](https://david-dm.org/FreeAllMedia/generator-oss-component?theme=shields.io) [![Dev Dependency Status](https://david-dm.org/FreeAllMedia/generator-oss-component/dev-status.svg)](https://david-dm.org/FreeAllMedia/generator-oss-component?theme=shields.io#info=devDependencies)

# Overview

This yeoman generator will prompt you the following questions:

* What is the component name?
* What description do you want to give for the component?
* What is your organization name?
* What is your organization type?
* There is a Floobits workspace for this repo (Development Real-time Collaboration)?
* do you want to add SauceLabs (Cross Browser Testing)?
* do you want to add Travis (Continuous Integration) support?
* do you want to add Code Climate (Code Quality) support?
* do you want to add David (Dependency Management) support?

# Usage

## Install via `npm`

```
npm install -g generator-oss-component
```

or (avoiding npm install and gulp test)

```
npm install -g generator-oss-component --skip-install
```


## Run Automated Tests

We automatically test every release against node versions `0.10`, `0.11`, `0.12`, and `iojs-v2`. If you are using a different environment, run our tests to ensure that it works as intended for you.

```
cd node_modules/generator-oss-component
npm test
```

## Use With Yeoman

```
mkdir myNewOssComponent
cd myNewOssComponent
git init
git push origin master

//... link it with travis... using travis-ci.org
//... create your sauce lab user
//... create your floobits workspace
//... configure codeclimate
//... setup your badges
// and then run... (so it generates the travis keys for you)

yo oss-component
```

# Contributing

We highly encourage you to fork this repo, make enhancements, and then submit pull requests back!

When contributing:

1. You must follow strict test-driven best practices.
  * Tests must be written prior to library code being written. Google `Red, Green, Refactor` for more information on this expectation.
2. You must adhere to our automated `.eslintrc` style guide and can ensure that it is passing without warnings or errors before you submit a pull request.

## Public Shared Floobits Workspace

https://floobits.com/fam-operations/generator-oss-component
