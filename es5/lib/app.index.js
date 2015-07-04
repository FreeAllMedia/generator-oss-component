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

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _flowsync = require("flowsync");

var _flowsync2 = _interopRequireDefault(_flowsync);

var copyFilesIf = Symbol(),
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
			this.answers = {};
		}
	}, {
		key: "prompting",
		value: function prompting() {
			var _this = this;

			var done = this.async();

			// Have Yeoman greet the user.
			this.log((0, _yosay2["default"])("Welcome to the stylish OSS component generator! Let's begin with some questions about the component itself:"));

			var ask = function ask(questions, callback) {
				_this.prompt(questions, function (answers) {
					for (var answerName in answers) {
						_this.answers[answerName] = answers[answerName];
					}
					callback(_this.answers);
				});
			};

			var prompts = [
			// Component Details
			function (promptComplete) {
				_this.log("Component Details:");
				ask([{
					type: "input",
					name: "name",
					message: "What is the component's package name, in camel case? (exactlyLikeThis)",
					"default": "myComponent"
				}, {
					type: "input",
					name: "description",
					message: "How would you describe the component?",
					"default": "It cuts fries. It dices onions."
				}, {
					type: "input",
					name: "organizationName",
					message: "What is your organization name?",
					"default": "Free All Media, LLC"
				}], function () {
					promptComplete();
				});
			},

			// Repository Details
			function (promptComplete) {
				_this.log("GitHub Details:");
				ask([{
					type: "input",
					name: "gitHubAccountName",
					message: "What is the GitHub user or organization name that the component will be published under?",
					"default": "FreeAllMedia"
				}], function () {
					ask([{
						type: "input",
						name: "repositoryUrl",
						message: "What is your GitHub repository url?",
						"default": "https://github.com/" + _this.answers.gitHubAccountName + "/" + _this.answers.name + ".git"
					}, {
						type: "input",
						name: "issueTrackerUrl",
						message: "What is the issue tracker url for the component?",
						"default": "https://github.com/" + _this.answers.gitHubAccountName + "/" + _this.answers.name + "/issues"
					}, {
						type: "input",
						name: "homepage",
						message: "What is the component homepage?",
						"default": "https://github.com/" + _this.answers.gitHubAccountName + "/" + _this.answers.name
					}], function () {
						promptComplete();
					});
				});
			},

			// Collaborative Coding
			function (promptComplete) {
				_this.log("Collaborative Coding:");
				ask([{
					type: "confirm",
					name: "floobits",
					message: "Do you want this component to integrate with Floobits?",
					"default": false
				}], function () {
					if (_this.answers.floobits) {
						ask([{
							type: "input",
							name: "floobitsWorkspace",
							message: "What is the floobits workspace url?",
							"default": "https://floobits.com/" + _this.answers.gitHubAccountName + "/" + _this.answers.name
						}], function () {
							promptComplete();
						});
					} else {
						promptComplete();
					}
				});
			},

			// Cross-Browser Testing
			function (promptComplete) {
				_this.log("Cross-Browser Testing:");
				ask([{
					type: "confirm",
					name: "sauceLabs",
					message: "Do you want this component to integrate with SauceLabs?",
					"default": false
				}], function () {
					if (_this.answers.sauceLabs) {
						ask([{
							type: "input",
							name: "sauceLabsUserName",
							message: "Please provide the user name for Sauce Labs (if the Travis slug is already linked, we will encrypt it into the travis yaml for you)",
							"default": "" + _this.answers.name
						}, {
							type: "input",
							name: "sauceLabsAccessToken",
							message: "Paste here the access key for Sauce Labs (we will encrypt it for you, too)",
							"default": ""
						}], function () {
							promptComplete();
						});
					} else {
						promptComplete();
					}
				});
			},

			// Code Quality Testing
			function (promptComplete) {
				_this.log("Code Quality Provider:");
				ask([{
					type: "list",
					name: "codeQuality",
					choices: [{ name: "Code Climate", value: "codeClimate" }, "bithound", "none"],
					message: "Pick one of the available code quality providers or none.",
					"default": "none"
				}], function () {
					promptComplete();
				});
			},

			// Continuous Integration
			function (promptComplete) {
				_this.log("Continuous Integration:");
				ask([{
					type: "confirm",
					name: "travis",
					message: "Do you want this component to integrate with Travic-CI?",
					"default": false
				}], function () {
					promptComplete();
				});
			},
			//npm publish
			function (promptComplete) {
				if (_this.answers.travis) {
					ask([{
						type: "confirm",
						name: "npmPublish",
						message: "Do you want this component to be published to npm on your behalf after a succesful build on travis?",
						"default": false
					}], function () {
						if (_this.answers.npmPublish) {
							ask([{
								type: "input",
								name: "npmEmail",
								message: "Please provide the email for Npm (we will add it to the travis yaml for you onto the deploy section)",
								"default": ""
							}, {
								type: "input",
								name: "npmUserName",
								message: "Please provide the user name for Npm (yeah, we will encrypt it into the travis yaml for you)",
								"default": ""
							}, {
								type: "input",
								name: "npmPassword",
								message: "Provide the npm password (encrypted as well, with this and the username we create the api key that gets encrypted to the YAML)",
								"default": ""
							}], function () {
								promptComplete();
							});
						} else {
							promptComplete();
						}
					});
				} else {
					promptComplete();
				}
			},

			// Depedency Management
			function (promptComplete) {
				_this.log("Depedency Management:");
				ask([{
					type: "confirm",
					name: "david",
					message: "Do you want this component to integrate with David-DM??",
					"default": false
				}], function () {
					if (_this.answers.david) {
						ask([{
							type: "input",
							name: "davidRepo",
							message: "Confirm or paste a new David url",
							"default": "https://david-dm.org/" + _this.answers.gitHubAccountName + "/" + _this.answers.name
						}], function () {
							promptComplete();
						});
					} else {
						promptComplete();
					}
				});
			}];

			_flowsync2["default"].series(prompts, done);
		}
	}, {
		key: "configuring",
		value: function configuring() {}
	}, {
		key: "writing",
		value: function writing() {
			this.context = {};

			for (var propertyName in this.answers) {
				this.context[propertyName] = this.answers[propertyName];
			}

			this.context.componentNamePascalCase = (0, _jargon2["default"])(this.context.name).pascal.toString();

			try {
				_fs2["default"].statSync(this.destinationPath("es6/lib"));
			} catch (e) {
				this[copyFilesIf](["es6/lib/_##componentName##.js", "es6/spec/_##componentName##.spec.js"]);
			}

			this[copyFilesIf](["_README.md", "_package.json"], function (destination) {
				try {
					_fs2["default"].statSync(destination);
					return false;
				} catch (e) {
					return true;
				}
			});

			// copy files
			this[copyFilesIf](["_.eslintrc", "_.gitignore", "_.jshintrc", "_.karma.conf.js", "_LICENSE", "_gulpfile.babel.js", "_index.js", "_paths.json", "_.editorconfig", "tasks/_build.js", "tasks/_build-lib.js", "tasks/_build-lib-assets.js", "tasks/_build-spec.js", "tasks/_build-spec-assets.js", "tasks/_test-local.js", "tasks/_test-browsers.js", "tasks/_test.js"]);

			if (this.answers.floobits) {
				this[copyFilesIf](["_.floo", "_.flooignore"]);
			}

			if (this.answers.sauceLabs) {
				this[copyFilesIf](["_.sauce.json"]);
			}

			if (this.answers.travis) {
				this[copyFilesIf](["_.travis.yml"]);
			}
		}
	}, {
		key: "install",
		value: function install() {

			//generate travis crypted environment vars and append to the travis YAML
			if (this.answers.sauceLabs) {
				var result = _child_process2["default"].spawnSync("node", ["" + __dirname + "/../../node_modules/travis-encrypt/bin/travis-encrypt-cli.js", "-ar", "" + this.answers.gitHubAccountName + "/" + this.answers.name, "SAUCE_USERNAME=" + this.answers.sauceLabsUserName, "SAUCE_ACCESS_KEY=" + this.answers.sauceLabsAccessToken], {
					cwd: "" + this.destinationRoot(),
					encoding: "utf8"
				});
				if (result.error) {
					this.log("\nWARNING: TRAVIS SAUCELAB ENCRYPT ERROR \n", result.error);
				} else if (result.stderr) {
					this.log("\nWARNING: TRAVIS SAUCELAB ENCRYPT COMMAND ERROR (maybe repo not found at " + this.answers.gitHubAccountName + "/" + this.answers.name + "?) \n");
				}
			}

			if (this.answers.npmPublish) {
				//encrypt with travis
				//echo -u "fam:5vDL1CJGXykkL5XNiEfLAxWM" | base64 | ./node_modules/travis-encrypt/bin/travis-encrypt-cli.js --add deploy.api_key -r FreeAllMedia/generator-oss-component LXUgZmFtOjV2REwxQ0pHWHlra0w1WE5pRWZMQXhXTQo=
				var apiKey = new Buffer("" + this.answers.npmUserName + ":" + this.answers.npmPassword).toString("base64");
				this.log("Executing travis encryption for the travis slug " + this.answers.gitHubAccountName + "/" + this.answers.name + " with api key " + apiKey);
				var result = _child_process2["default"].spawnSync("node", ["" + __dirname + "/../../node_modules/travis-encrypt/bin/travis-encrypt-cli.js", "-a", "deploy.api_key", "-r", "" + this.answers.gitHubAccountName + "/" + this.answers.name, "" + apiKey], {
					cwd: "" + this.destinationRoot(),
					encoding: "utf8"
				});

				if (result.error) {
					this.log("\nWARNING: TRAVIS ENCRYPT NPM ERROR \n", result.error);
				} else if (result.stderr) {
					this.log("\nWARNING: TRAVIS ENCRYPT NPM COMMAND ERROR (maybe repo not found at " + this.answers.gitHubAccountName + "/" + this.answers.name + "?) \n");
				}
			}

			this[installAndTest]();
		}
	}, {
		key: copyFilesIf,

		//PRIVATE METHODS

		value: function (files) {
			var _this2 = this;

			var predicate = arguments[1] === undefined ? function () {
				return true;
			} : arguments[1];

			files.forEach(function (templatePath) {
				var newName = templatePath.replace("_", "");
				newName = newName.replace("##componentName##", _this2.context.name);
				if (predicate(_this2.destinationPath(newName))) {
					_this2.fs.copyTpl(_this2.templatePath(templatePath), _this2.destinationPath("" + newName), _this2.context);
				}
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