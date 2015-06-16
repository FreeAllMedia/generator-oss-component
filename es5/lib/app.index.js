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

var copyFiles = Symbol();

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
				"default": "Free All Media LLC"
			}, {
				type: "confirm",
				name: "floobits",
				message: "There is a Floobits workspace for this repo?",
				"default": true
			}, {
				type: "confirm",
				name: "sauceLabs",
				message: "do you want to add SauceLabs?",
				"default": true
			}, {
				type: "confirm",
				name: "travis",
				message: "do you want to add Travis support?",
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
					message: "Please provide the user name for Sauce Labs (we will encrypt it into the travis yaml for you)",
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
				}];

				this.prompt(prompts, (function (newProperties) {
					// Object.assign(this.properties, newProperties);
					this.properties.floobitsWorkspace = newProperties.floobitsWorkspace;
					this.properties.repositoryUrl = newProperties.repositoryUrl;
					this.properties.issueTrackerUrl = newProperties.issueTrackerUrl;
					this.properties.homepage = newProperties.homepage;
					if (this.properties.sauceLabs) {
						console.log("using travis repoSuffix ", this.properties.repoSuffix);
						(0, _child_process.exec)("../../node_modules/travis-encrypt/bin/travis-encrypt-cli.js -r " + this.properties.repoSuffix + " SAUCE_USERNAME=" + newProperties.sauceLabsUserName + " SAUCE_ACCESS_TOKEN=" + newProperties.sauceLabsAccessToken, function execCallback(error, standardOutput, stderr) {
							console.log("standardOutput is ", { stdout: standardOutput, error: error, stderr: stderr });
							done();
						});
						// coomented because of the issue
						// https://github.com/pwmckenna/node-travis-encrypt/issues/10
						// encrypt(this.properties.repoSuffix,
						//     `SAUCE_USERNAME=${newProperties.sauceLabsUserName} SAUCE_ACCESS_TOKEN=${newProperties.sauceLabsAccessToken}`,
						//     function encryptCallback(error, data) {
						//       console.log("encrypt sauce labs", {data: data});
						//       this.properties.travisEnvironment = data;
						//       done();
						//     }.bind(this)
						//   );
					} else {
						done();
					}
				}).bind(this));
			}).bind(this));
		}
	}, {
		key: "writing",
		value: function writing() {
			this.context = {
				name: this.properties.name,
				description: this.properties.description,
				floobitsWorkspace: this.properties.floobitsWorkspace,
				componentNamePascalCase: (0, _jargon2["default"])(this.properties.name).pascal.toString(),
				organizationName: this.properties.organizationName,
				homepage: this.properties.homepage,
				repositoryUrl: this.properties.repositoryUrl,
				issueTrackerUrl: this.properties.issueTrackerUrl,
				sauceUserName: this.properties.sauceLabsUserName || "",
				sauceLabsAccessToken: this.properties.sauceLabsAccessToken || ""
			};

			// copy files
			this[copyFiles](["_.codeclimate.yml", "_.sauce.json", "_.eslintrc", "_.floo", "_.flooignore", "_.gitignore", "_.jshintrc", "_.karma.conf.js", "_LICENSE.md", "_README.md", "_package.json", "_gulpfile.babel.js", "_index.js", "_paths.json", "tasks/_build.js", "tasks/_build-lib.js", "tasks/_build-spec.js", "tasks/_test-local.js", "tasks/_test-browsers.js", "tasks/_test.js", "es6/lib/_##componentName##.js", "es6/spec/_##componentName##.spec.js"]);

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
		key: copyFiles,
		value: function (files) {
			var _this2 = this;

			files.forEach(function (templatePath) {
				var newName = templatePath.replace("_", "");
				newName = newName.replace("##componentName##", _this2.context.name);
				_this2.fs.copyTpl(_this2.templatePath(templatePath), _this2.destinationPath("" + newName), _this2.context);
			}, this);
		}
	}, {
		key: "install",
		value: function install() {
			this.installDependencies({
				skipInstall: this.options["skip-install"],
				callback: (function callbackInstallDependencies() {
					if (!this.skipInstall) {
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