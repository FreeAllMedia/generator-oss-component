# <%= componentNamePascalCase %>.js [![npm version](https://img.shields.io/npm/v/<%= name %>.svg)](https://www.npmjs.com/package/<%= name %>) [![license type](https://img.shields.io/npm/l/<%= name %>.svg)](<%= repositoryUrl %>/blob/master/LICENSE) [![npm downloads](https://img.shields.io/npm/dm/<%= name %>.svg)](https://www.npmjs.com/package/<%= name %>) ![ECMAScript 6 & 5](https://img.shields.io/badge/ECMAScript-6%20/%205-red.svg)

<%= description %>

```javascript
import <%= componentNamePascalCase %> from "<%= name %>";

const <%= name %> = new <%= componentNamePascalCase %>;
<%= name %>.saySomething(); // will output "Something"
```

# Quality and Compatibility

<% if (travis) { %>[![Build Status](https://travis-ci.org/<%= gitHubAccountName %>/<%= name %>.png?branch=master)](https://travis-ci.org/<%= gitHubAccountName %>/<%= name %>)<% } %><% if (codeClimate) { %> [![Code Climate](https://codeclimate.com/github/<%= gitHubAccountName %>/<%= name %>/badges/gpa.svg)](https://codeclimate.com/github/<%= gitHubAccountName %>/<%= name %>)<% } %> <% if (david) { %>[![Dependency Status](https://david-dm.org/<%= gitHubAccountName %>/<%= name %>.png?theme=shields.io)](https://david-dm.org/<%= gitHubAccountName %>/<%= name %>?theme=shields.io) [![Dev Dependency Status](https://david-dm.org/<%= gitHubAccountName %>/<%= name %>/dev-status.svg)](https://david-dm.org/<%= gitHubAccountName %>/<%= name %>?theme=shields.io#info=devDependencies)<% } %>

*Every build and release is automatically tested on the following platforms:*

![node 0.12.x](https://img.shields.io/badge/node-0.12.x-brightgreen.svg) ![node 0.11.x](https://img.shields.io/badge/node-0.11.x-brightgreen.svg) ![node 0.10.x](https://img.shields.io/badge/node-0.10.x-brightgreen.svg)
![iojs 2.x.x](https://img.shields.io/badge/iojs-2.x.x-brightgreen.svg) ![iojs 1.x.x](https://img.shields.io/badge/iojs-1.x.x-brightgreen.svg)

<% if (sauceLabs) { %>
[![Sauce Test Status](https://saucelabs.com/browser-matrix/<%= name %>.svg)](https://saucelabs.com/u/<%= name %>)
<% } %>

*If your platform is not listed above, you can test your local environment for compatibility by copying and pasting the following commands into your terminal:*

```
npm install <%= name %>
cd node_modules/<%= name %>
gulp test-local
```

# Installation

Copy and paste the following command into your terminal to install <%= componentNamePascalCase %>:

```
npm install <%= name %> --save
```

## Import / Require

```
// ES6
import <%= name %> from "<%= name %>";
```

```
// ES5
var <%= name %> = require("<%= name %>");
```

```
// Require.js
define(["require"] , function (require) {
    var <%= name %> = require("<%= name %>");
});
```

# Getting Started

## More insights

In order to say something, you should know that `<%= name %>()` ... (add your test here)

# How to Contribute

See something that could use improvement? Have a great feature idea? We listen!

You can submit your ideas through our [issues system](<%= issueTrackerUrl %>), or make the modifications yourself and submit them to us in the form of a [GitHub pull request](https://help.github.com/articles/using-pull-requests/).

We always aim to be friendly and helpful.

## Running Tests

It's easy to run the test suite locally, and *highly recommended* if you're using <%= componentNamePascalCase %>.js on a platform we aren't automatically testing for.

```
npm test
```

<% if (floobits) { %>
## Public Shared Floobits Workspace

Whenever we're working on <%= componentNamePascalCase %>.js, we connect to a public workspace on FlooBits that lets you see and interact with the developers. Feel free to stop by, say hello, and offer suggestions!

<%= floobitsWorkspace %>
<% } %>
