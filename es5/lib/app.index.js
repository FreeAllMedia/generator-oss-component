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

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

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
		}
	}, {
		key: "prompting",
		value: function prompting() {
			var done = this.async();

			// Have Yeoman greet the user.
			this.log((0, _yosay2["default"])("Welcome to the stylish OSS component generator! Let's begin with some questions about the component itself:"));

			askComponentQuestions.bind(this)();

			function askComponentQuestions() {
				var _this = this;

				this.prompt([{
					type: "input",
					name: "name",
					message: "What is the component's package name? (in camel case; exactlyLikeThis)",
					"default": "myComponent"
				}, {
					type: "input",
					name: "description",
					message: "How would you quickly describe the component?",
					"default": "It cuts fries. It dices onions."
				}, {
					type: "input",
					name: "organizationName",
					message: "What is your organization name?",
					"default": "Free All Media, LLC"
				}], function (answers) {
					_this.properties = answers;
					askRespositoryQuestions.bind(_this)();
				});
			}

			function askRespositoryQuestions() {
				var _this2 = this;

				this.prompt([{
					type: "confirm",
					name: "gitHub",
					message: "Are you using GitHub?"
				}], function (answers) {
					for (var answerName in answers) {
						_this2.properties[answerName] = answers[answerName];
					}

					if (_this2.properties.gitHub) {
						askGitHubQuestions.bind(_this2)();
					} else {
						askGenericRepositoryQuestions.bind(_this2)();
					}
				});
			}

			function askGenericRepositoryQuestions() {
				var _this3 = this;

				this.prompt([{
					type: "input",
					name: "repositoryUrl",
					message: "What is your repository url?",
					"default": "https://something.com/something.git",
					when: function when() {
						return !_this3.properties.gitHub;
					}
				}, {
					type: "input",
					name: "homepage",
					message: "What is the component homepage?",
					"default": "https://yoursite.com/",
					when: function when() {
						return !_this3.properties.gitHub;
					}
				}], function (answers) {
					for (var answerName in answers) {
						_this3.properties[answerName] = answers[answerName];
					}

					askCollaborationQuestions.bind(_this3)();
				});
			}

			function askGitHubQuestions() {
				var _this4 = this;

				this.prompt([{
					type: "input",
					name: "gitHubOrganizationName",
					message: "What is your organization name or username on GitHub?",
					"default": "FreeAllMedia",
					when: function when() {
						return _this4.properties.gitHub;
					}
				}, {
					type: "input",
					name: "repositoryUrl",
					message: "What is your repository url?",
					"default": "https://github.com/" + this.properties.gitHubOrganizationName + "/" + this.properties.name + ".git",
					when: function when() {
						return _this4.properties.gitHub;
					}
				}, {
					type: "input",
					name: "issueTrackerUrl",
					message: "What is the issue tracker url for the component?",
					"default": "https://github.com/" + this.properties.gitHubOrganizationName + "/" + this.properties.name + "/issues",
					when: function when() {
						return _this4.properties.gitHub;
					}
				}, {
					type: "input",
					name: "homepage",
					message: "What is the component homepage?",
					"default": "https://github.com/" + this.properties.gitHubOrganizationName + "/" + this.properties.name,
					when: function when() {
						return _this4.properties.gitHub;
					}
				}, {
					type: "confirm",
					name: "gitHubAutomate",
					message: "Do you want to automatically setup your GitHub repository?",
					when: function when() {
						return _this4.properties.gitHub;
					}
				}, {
					type: "input",
					name: "gitHubClientId",
					message: "What is your GitHub Client ID?",
					when: function when() {
						return _this4.properties.gitHubAutomate;
					}
				}, {
					type: "input",
					name: "gitHubClientSecret",
					message: "What is your GitHub Client Secret?",
					when: function when() {
						return _this4.properties.gitHubAutomate;
					}
				}], function (answers) {
					for (var answerName in answers) {
						_this4.properties[answerName] = answers[answerName];
					}
					askCollaborationQuestions.bind(_this4)();
				});
			}

			function askCollaborationQuestions() {
				var _this5 = this;

				this.prompt([{
					type: "confirm",
					name: "floobits",
					message: "Do you want this component to integrate with Floobits (Collaborative Coding)?",
					"default": false
				}, {
					type: "input",
					name: "floobitsWorkspace",
					message: "What is the floobits workspace url?",
					"default": "https://floobits.com/" + this.properties.gitHubOrganizationName + "/" + this.properties.name,
					when: function when() {
						return _this5.properties.floobits;
					}
				}], function (answers) {
					for (var answerName in answers) {
						_this5.properties[answerName] = answers[answerName];
					}
					askBrowserTestingQuestions.bind(_this5)();
				});
			}

			function askBrowserTestingQuestions() {
				var _this6 = this;

				this.prompt([{
					type: "confirm",
					name: "sauceLabs",
					message: "Do you want this component to integrate with SauceLabs (Cross Browser Testing)?",
					"default": false
				}, {
					type: "input",
					name: "sauceLabsUserName",
					message: "Please provide the user name for Sauce Labs (if the Travis slug is already linked, we will encrypt it into the travis yaml for you)",
					"default": "" + this.properties.name,
					when: function when() {
						return _this6.properties.sauceLabs;
					}
				}, {
					type: "input",
					name: "sauceLabsAccessToken",
					message: "Paste here the access token for Sauce Labs (we will encrypt it for you, too)",
					"default": "",
					when: function when() {
						return _this6.properties.sauceLabs;
					}
				}], function (answers) {
					for (var answerName in answers) {
						_this6.properties[answerName] = answers[answerName];
					}
					askContinuousIntegrationQuestions.bind(_this6)();
				});
			}

			function askContinuousIntegrationQuestions() {
				var _this7 = this;

				this.prompt([{
					type: "confirm",
					name: "travis",
					message: "Do you want this component to integrate with Travic-CI (Continuous Integration)?",
					"default": false
				}], function (answers) {
					for (var answerName in answers) {
						_this7.properties[answerName] = answers[answerName];
					}
					askDependencyManagementQuestions.bind(_this7)();
				});
			}

			function askDependencyManagementQuestions() {
				var _this8 = this;

				this.prompt([{
					type: "confirm",
					name: "david",
					message: "Do you want this component to integrate with David-DM? (Dependency Management)?",
					"default": false
				}, {
					type: "input",
					name: "davidRepo",
					message: "Confirm or paste a new David url",
					"default": "https://david-dm.org/" + this.properties.repoSuffix,
					when: function when() {
						return _this8.properties.david;
					}
				}], function (answers) {
					for (var answerName in answers) {
						_this8.properties[answerName] = answers[answerName];
					}
					done();
				});
			}

			// const questionFunctions = [];
			// this.properties = {};

			// questionSequence.forEach((questions) => {
			// 	const questionsFunction = (questionsDone) => {
			// 		this.prompt(questions, (answers) => {
			// 			questionsDone();
			// 		});
			// 	};
			// 	questionFunctions.push(questionsFunction);
			// });

			// async.series(questionFunctions, done);
		}
	}, {
		key: "writing",
		value: function writing() {
			this.context = {
				name: this.properties.name,
				description: this.properties.description,
				floobits: this.properties.floobits,
				floobitsWorkspace: this.properties.floobitsWorkspace,
				gitHubOrganizationName: this.properties.gitHubOrganizationName,
				componentNamePascalCase: (0, _jargon2["default"])(this.properties.name).pascal.toString(),
				organizationName: this.properties.organizationName,
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
				codeClimateRepoToken: this.properties.codeClimateRepoToken || "",
				david: this.properties.david,
				davidRepo: this.properties.davidRepo || ""
			};

			try {
				var f = _fs2["default"].statSync(this.destinationPath("es6/lib"));
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
			this[copyFilesIf](["_.eslintrc", "_.gitignore", "_.jshintrc", "_.karma.conf.js", "_LICENSE", "_gulpfile.babel.js", "_index.js", "_paths.json", "_.editorconfig", "tasks/_build.js", "tasks/_build-lib.js", "tasks/_build-spec.js", "tasks/_test-local.js", "tasks/_test-browsers.js", "tasks/_test.js"]);

			if (this.properties.codeClimate) {
				this[copyFilesIf](["_.codeclimate.yml", "tasks/_codeClimate.js"]);
			}

			if (this.properties.floobits) {
				this[copyFilesIf](["_.floo", "_.flooignore"]);
			}

			if (this.properties.sauceLabs) {
				this[copyFilesIf](["_.sauce.json"]);
			}

			if (this.properties.travis) {
				this[copyFilesIf](["_.travis.yml"]);
			}
		}
	}, {
		key: "install",
		value: function install() {
			//generate travis crypted environment vars and append to the travis YAML
			if (this.properties.sauceLabs) {
				var result = _child_process2["default"].spawnSync("node", ["" + __dirname + "/../../node_modules/travis-encrypt/bin/travis-encrypt-cli.js", "-ar", "" + this.properties.repoSuffix, "SAUCE_USERNAME=" + this.properties.sauceLabsUserName, "SAUCE_ACCESS_KEY=" + this.properties.sauceLabsAccessToken, "CODECLIMATE_REPO_TOKEN=" + this.properties.codeClimateRepo], {
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
		key: copyFilesIf,

		//PRIVATE METHODS

		value: function (files) {
			var _this9 = this;

			var predicate = arguments[1] === undefined ? function () {
				return true;
			} : arguments[1];

			files.forEach(function (templatePath) {
				var newName = templatePath.replace("_", "");
				newName = newName.replace("##componentName##", _this9.context.name);
				if (predicate(_this9.destinationPath(newName))) {
					_this9.fs.copyTpl(_this9.templatePath(templatePath), _this9.destinationPath("" + newName), _this9.context);
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