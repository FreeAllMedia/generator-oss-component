"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _yeomanGenerator = require("yeoman-generator");

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _yosay = require("yosay");

var _yosay2 = _interopRequireDefault(_yosay);

var _jargon = require("jargon");

var _jargon2 = _interopRequireDefault(_jargon);

var _travisEncrypt = require("travis-encrypt");

var _travisEncrypt2 = _interopRequireDefault(_travisEncrypt);

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

var copyFiles = Symbol(),
    installAndTest = Symbol();

var Component = (function (_yeoman$generators$Base) {
  function Component() {
    _classCallCheck(this, Component);

    if (_yeoman$generators$Base != null) {
      _yeoman$generators$Base.apply(this, arguments);
    }
  }

  _inherits(Component, _yeoman$generators$Base);

  _createClass(Component, [{
    key: "initializing",
    value: function initializing() {
      this.pkg = require("../../package.json");
    }
  }, {
    key: "prompting",
    value: function prompting() {
      var done = this.async();
      // Have Yeoman greet the user.
      this.log((0, _yosay2["default"])("Welcome to the stylish OSS component generator! our base path is " + this.destinationRoot()));

      var prompts = [{
        type: "input",
        name: "name",
        message: "What is the component name? (camel case please => exactlyLikeThis)",
        "default": "myComponent"
      }, {
        type: "input",
        name: "description",
        message: "What is the component description?",
        "default": "This is a component to say something."
      }, {
        type: "input",
        name: "organizationName",
        message: "What is your organization name?",
        "default": "Free All Media"
      }, {
        type: "input",
        name: "organizationType",
        message: "What is your organization type?",
        "default": "LLC"
      }, {
        type: "confirm",
        name: "floobits",
        message: "There is a Floobits workspace for this repo (Development Real-time Collaboration)?",
        "default": true
      }, {
        type: "confirm",
        name: "sauceLabs",
        message: "do you want to add SauceLabs (Cross Browser Testing)?",
        "default": true
      }, {
        type: "confirm",
        name: "travis",
        message: "do you want to add Travis (Continuous Integration) support?",
        "default": true
      }, {
        type: "confirm",
        name: "codeClimate",
        message: "do you want to add Code Climate (Code Quality) support?",
        "default": true
      }, {
        type: "confirm",
        name: "david",
        message: "do you want to add David (Dependency Management) support?",
        "default": true
      }];

      // https://github.com/FreeAllMedia/jargon
      this.prompt(prompts, (function (newProperties) {
        var _this = this;

        this.properties = newProperties;
        this.properties.organizationNameCamelCase = (0, _jargon2["default"])(this.properties.organizationName).camel.toString();
        this.properties.organizationNamePascalCase = (0, _jargon2["default"])(this.properties.organizationName).camel.pascal.toString();
        this.properties.repoSuffix = "" + this.properties.organizationNamePascalCase + "/" + this.properties.name;

        prompts = [{
          type: "input",
          name: "repositoryUrl",
          message: "What is your repo url?",
          "default": "https://github.com/" + this.properties.repoSuffix + ".git"
        }, {
          type: "input",
          name: "issueTrackerUrl",
          message: "What is the issue tracker url for the component?",
          "default": "https://github.com/" + this.properties.repoSuffix + "/issues"
        }, {
          type: "input",
          name: "homepage",
          message: "What is the component homepage?",
          "default": "https://github.com/" + this.properties.repoSuffix
        }, {
          type: "input",
          name: "floobitsWorkspace",
          message: "What is the floobits workspace url?",
          "default": "https://floobits.com/" + this.properties.repoSuffix,
          when: function when() {
            return _this.properties.floobits;
          }
        }, {
          type: "input",
          name: "sauceLabsUserName",
          message: "Please provide the user name for Sauce Labs (if the Travis slug is already linked, we will encrypt it into the travis yaml for you)",
          "default": "" + this.properties.organizationNameCamelCase,
          when: function when() {
            return _this.properties.sauceLabs;
          }
        }, {
          type: "input",
          name: "sauceLabsAccessToken",
          message: "Paste here the access token for Sauce Labs (we will encrypt it for you, too)",
          "default": "",
          when: function when() {
            return _this.properties.sauceLabs;
          }
        }, {
          type: "input",
          name: "codeClimateRepo",
          message: "Paste here the Code Climate Repo code",
          "default": "",
          when: function when() {
            return _this.properties.codeClimate;
          }
        }, {
          type: "input",
          name: "codeClimateBadge",
          message: "Paste here the Code Climate Badge code",
          "default": "",
          when: function when() {
            return _this.properties.codeClimate;
          }
        }, {
          type: "input",
          name: "davidRepo",
          message: "Confirm or paste a new David url",
          "default": "https://david-dm.org/" + this.properties.repoSuffix,
          when: function when() {
            return _this.properties.david;
          }
        }];

        this.prompt(prompts, (function (newProperties) {
          // Object.assign(this.properties, newProperties);
          this.properties.floobitsWorkspace = newProperties.floobitsWorkspace;
          this.properties.repositoryUrl = newProperties.repositoryUrl;
          this.properties.issueTrackerUrl = newProperties.issueTrackerUrl;
          this.properties.homepage = newProperties.homepage;
          this.properties.sauceLabsAccessToken = newProperties.sauceLabsAccessToken;
          this.properties.sauceLabsUserName = newProperties.sauceLabsUserName;
          this.properties.codeClimateRepo = newProperties.codeClimateRepo;
          this.properties.codeClimateBadge = newProperties.codeClimateBadge;
          this.properties.davidRepo = newProperties.davidRepo;
          done();
        }).bind(this));
      }).bind(this));
    }
  }, {
    key: "writing",
    value: function writing() {
      this.context = {
        name: this.properties.name,
        description: this.properties.description,
        floobits: this.properties.floobits,
        floobitsWorkspace: this.properties.floobitsWorkspace,
        organizationNamePascalCase: this.properties.organizationNamePascalCase,
        componentNamePascalCase: (0, _jargon2["default"])(this.properties.name).pascal.toString(),
        organizationName: this.properties.organizationName,
        organizationType: this.properties.organizationType,
        homepage: this.properties.homepage,
        repositoryUrl: this.properties.repositoryUrl,
        issueTrackerUrl: this.properties.issueTrackerUrl,
        travis: this.properties.travis,
        sauceLabs: this.properties.sauceLabs,
        sauceLabsUserName: this.properties.sauceLabsUserName || "",
        sauceLabsAccessToken: this.properties.sauceLabsAccessToken || "",
        codeClimate: this.properties.codeClimate,
        codeClimateBadge: this.properties.codeClimateBadge || "",
        codeClimateRepo: this.properties.codeClimateRepo || "",
        david: this.properties.david,
        davidRepo: this.properties.davidRepo || ""
      };

      // copy files
      this[copyFiles](["_.eslintrc", "_.gitignore", "_.jshintrc", "_.karma.conf.js", "_LICENSE.md", "_README.md", "_package.json", "_gulpfile.babel.js", "_index.js", "_paths.json", "_.editorconfig", "tasks/_build.js", "tasks/_build-lib.js", "tasks/_build-spec.js", "tasks/_test-local.js", "tasks/_test-browsers.js", "tasks/_test.js", "es6/lib/_##componentName##.js", "es6/spec/_##componentName##.spec.js"]);

      if (this.properties.codeClimate) {
        this[copyFiles](["_.codeclimate.yml"]);
      }

      if (this.properties.floobits) {
        this[copyFiles](["_.floo", "_.flooignore"]);
      }

      if (this.properties.sauceLabs) {
        this[copyFiles](["_.sauce.json"]);
      }

      if (this.properties.travis) {
        this[copyFiles](["_.travis.yml"]);
      }
    }
  }, {
    key: "install",
    value: function install() {
      //generate travis crypted environment vars and append to the travis YAML
      if (this.properties.sauceLabs) {
        var commandString = "node";
        var result = _child_process2["default"].spawnSync(commandString, ["" + __dirname + "/../../node_modules/travis-encrypt/bin/travis-encrypt-cli.js", "-ar", "" + this.properties.repoSuffix, "SAUCE_USERNAME=" + this.properties.sauceLabsUserName, "SAUCE_ACCESS_TOKEN=" + this.properties.sauceLabsAccessToken], {
          cwd: "" + this.destinationRoot(),
          encoding: "utf8"
        });
        if (result.error) {
          process.stdout.write("\nWARNING: TRAVIS ENCRYPT ERROR \n", result.error);
        } else if (result.stderr) {
          process.stdout.write("\nWARNING: TRAVIS ENCRYPT COMMAND ERROR (maybe repo not found at " + this.properties.repoSuffix + "?) \n");
        }
      }

      this[installAndTest]();
    }
  }, {
    key: copyFiles,

    //PRIVATE METHODS

    value: function (files) {
      var _this2 = this;

      files.forEach(function (templatePath) {
        var newName = templatePath.replace("_", "");
        newName = newName.replace("##componentName##", _this2.context.name);
        _this2.fs.copyTpl(_this2.templatePath(templatePath), _this2.destinationPath("" + newName), _this2.context);
      }, this);
    }
  }, {
    key: installAndTest,
    value: function () {
      this.installDependencies({
        skipInstall: this.options["skip-install"],
        callback: (function callbackInstallDependencies() {
          //gulp test execution if there is a local gulp there already
          if (!this.options["skip-install"]) {
            this.spawnCommand("gulp", ["test"]);
          }
        }).bind(this)
      });
    }
  }]);

  return Component;
})(_yeomanGenerator2["default"].generators.Base);

exports["default"] = Component;
module.exports = exports["default"];