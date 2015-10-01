"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _yeomanGenerator = require("yeoman-generator");

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _rimraf = require("rimraf");

var _rimraf2 = _interopRequireDefault(_rimraf);

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

_chai2["default"].should();

var basePath = _path2["default"].join(_os2["default"].tmpdir(), "/temp-test");

describe("oss-component generator", function () {
	var context = undefined,
	    answers = undefined,
	    pkgVersion = undefined;

	this.timeout(10000); // Yeoman generation can sometimes take longer than 2 seconds. Let's give it 10.

	before(function () {
		answers = {
			"true": {
				"name": "jargon",
				"description": "some description for the component",
				"organizationName": "Free all media",

				"repositoryUrl": "someRepoUrl",
				"issueTrackerUrl": "someIssueTrackerUrl",
				"homepage": "someHomepageanswer",

				"travis": true,

				"floobits": true,
				"floobitsWorkspace": "floobits.com/someFlooobitsWorkspace",

				"sauceLabs": true,
				"sauceLabsAccessToken": "somesaucelabsaccesstokenanswer",
				"sauceLabsUserName": "somesaucelabsusernameanswer",

				"david": true,
				"davidRepo": "david-dm.org/somerepo",

				"codeClimate": true,
				"bithound": true,

				"gitHub": true,
				"gitHubAccountName": "FreeAllMedia"
			},
			"false": {
				"name": "jargon",
				"description": "some description for the component",
				"organizationName": "Free all media",

				"repositoryUrl": "someRepoUrl",
				"issueTrackerUrl": "someIssueTrackerUrl",
				"homepage": "someHomepageanswer",

				"travis": false,

				"floobits": false,

				"sauceLabs": false,

				"david": false,

				"codeClimate": false,
				"bithound": false,

				"gitHub": false
			}
		};

		pkgVersion = require("../../package.json").version;
	});

	describe("(with all false)", function () {

		before(function (done) {
			//create initial files and dires with a certain content
			(0, _rimraf2["default"])(basePath, function () {
				context = _yeomanGenerator.test.run(_path2["default"].join(__dirname, "../../generators/app")).inDir(basePath).withOptions({ "skip-install": true }).withPrompts(answers["false"]).on("end", done);
			});
		});

		describe("(general information)", function () {
			it("should set name property correctly", function () {
				context.generator.context.name.should.equal(answers["false"].name);
			});

			it("should set generatorVersion property correctly", function () {
				context.generator.context.generatorVersion.should.equal(pkgVersion);
			});

			it("should set description property correctly", function () {
				context.generator.context.description.should.equal(answers["false"].description);
			});

			it("should set organizationName property correctly", function () {
				context.generator.context.organizationName.should.equal(answers["false"].organizationName);
			});

			it("should set repositoryUrl property correctly", function () {
				context.generator.context.repositoryUrl.should.equal(answers["false"].repositoryUrl);
			});

			it("should set issueTrackerUrl property correctly", function () {
				context.generator.context.issueTrackerUrl.should.equal(answers["false"].issueTrackerUrl);
			});

			it("should set homepage property correctly", function () {
				context.generator.context.homepage.should.equal(answers["false"].homepage);
			});
		});

		describe("(code quality)", function () {
			it("should add nothing with codeclimate to the readme.md", function () {
				_yeomanGenerator.assert.noFileContent("README.md", /codeclimate\.com/);
			});
		});

		describe("(dependency management)", function () {
			it("should not add nothing with david dm to the readme.md", function () {
				_yeomanGenerator.assert.noFileContent("README.md", /david-dm\.org/);
			});
		});

		describe("(collaboration support)", function () {
			describe("(coding)", function () {
				it("should not create files for floobits support", function () {
					_yeomanGenerator.assert.noFile([".floo", ".flooignore"]);
				});

				it("should not add nothing with floobits to the readme.md", function () {
					_yeomanGenerator.assert.noFileContent("README.md", /floobits\.com/);
				});
			});
		});

		describe("(testing)", function () {
			it("should not create files for sauce labs", function () {
				_yeomanGenerator.assert.noFile([".sauce.json"]);
			});

			it("should not add nothing with saucelabs.com to the readme.md", function () {
				_yeomanGenerator.assert.noFileContent("README.md", /saucelabs\.com/);
			});
		});

		describe("(continuous integration)", function () {
			it("should not create files for Travis CI", function () {
				_yeomanGenerator.assert.noFile([".travis.yml"]);
			});

			it("should not add nothing with travis-ci.org to the readme.md", function () {
				_yeomanGenerator.assert.noFileContent("README.md", /travis-ci\.org/);
			});
		});
	});

	describe("(with all true)", function () {

		before(function (done) {
			(0, _rimraf2["default"])(basePath, function () {
				context = _yeomanGenerator.test.run(_path2["default"].join(__dirname, "../../generators/app")).inDir(basePath).withOptions({ "skip-install": true }).withPrompts(answers["true"]).on("end", done);
			});
		});

		describe("(template context)", function () {
			describe("(general information)", function () {
				it("should set name property correctly", function () {
					context.generator.context.name.should.equal(answers["true"].name);
				});

				it("should set description property correctly", function () {
					context.generator.context.description.should.equal(answers["true"].description);
				});

				it("should set organizationName property correctly", function () {
					context.generator.context.organizationName.should.equal(answers["true"].organizationName);
				});

				it("should set gitHubAccountName property correctly", function () {
					context.generator.context.gitHubAccountName.should.equal(answers["true"].gitHubAccountName);
				});

				it("should set repositoryUrl property correctly", function () {
					context.generator.context.repositoryUrl.should.equal(answers["true"].repositoryUrl);
				});

				it("should set issueTrackerUrl property correctly", function () {
					context.generator.context.issueTrackerUrl.should.equal(answers["true"].issueTrackerUrl);
				});

				it("should set homepage property correctly", function () {
					context.generator.context.homepage.should.equal(answers["true"].homepage);
				});
			});

			describe("(floobits)", function () {
				it("should set floobits correctly", function () {
					context.generator.context.floobits.should.equal(answers["true"].floobits);
				});

				it("should set floobits workspace correctly", function () {
					context.generator.context.floobitsWorkspace.should.equal(answers["true"].floobitsWorkspace);
				});
			});

			describe("(codeclimate)", function () {
				it("should set code climate correctly", function () {
					context.generator.context.codeClimate.should.equal(answers["true"].codeClimate);
				});

				it("should set bithound correctly", function () {
					context.generator.context.bithound.should.equal(answers["true"].bithound);
				});
			});

			describe("(david)", function () {
				it("should set david correctly", function () {
					context.generator.context.david.should.equal(answers["true"].david);
				});

				it("should set davidRepo workspace correctly", function () {
					context.generator.context.davidRepo.should.equal(answers["true"].davidRepo);
				});
			});

			describe("(sauceLabs)", function () {
				it("should set sauceLabs correctly", function () {
					context.generator.context.sauceLabs.should.equal(answers["true"].sauceLabs);
				});

				it("should set sauceLabsUserName workspace correctly", function () {
					context.generator.context.sauceLabsUserName.should.equal(answers["true"].sauceLabsUserName);
				});

				it("should set sauceLabsAccessToken workspace correctly", function () {
					context.generator.context.sauceLabsAccessToken.should.equal(answers["true"].sauceLabsAccessToken);
				});
			});
		});

		describe("(licensing)", function () {
			it("should create a LICENSE file", function () {
				_yeomanGenerator.assert.file(["LICENSE"]);
			});
		});

		describe("(documentation)", function () {
			it("should create a README file", function () {
				_yeomanGenerator.assert.file(["README.md"]);
			});
		});

		describe("(package-description)", function () {
			it("should create a package.json file", function () {
				_yeomanGenerator.assert.file(["package.json"]);
			});
		});

		describe("(code quality)", function () {
			it("should add code climate to the readme.md", function () {
				_yeomanGenerator.assert.fileContent("README.md", /codeclimate\.com/);
			});

			it("should add bithound to the readme.md", function () {
				_yeomanGenerator.assert.fileContent("README.md", /bithound\.io/);
			});

			it("should create files to ignore es5 folder", function () {
				_yeomanGenerator.assert.file([".bithoundrc", ".codeclimate.yml"]);
			});

			describe("(linting)", function () {
				it("should generate an eslint file", function () {
					_yeomanGenerator.assert.file([".eslintrc"]);
				});

				it("should generate an jshint file", function () {
					_yeomanGenerator.assert.file([".jshintrc"]);
				});
			});

			describe("(editorconfig)", function () {
				it("should generate a file for the IDE", function () {
					_yeomanGenerator.assert.file(".editorconfig");
				});
			});
		});

		describe("(dependency management)", function () {
			it("should add david dm to the readme.md", function () {
				_yeomanGenerator.assert.fileContent("README.md", /david-dm\.org/);
			});
		});

		describe("(collaboration support)", function () {
			describe("(coding)", function () {
				it("should create files for floobits support", function () {
					_yeomanGenerator.assert.file([".floo", ".flooignore"]);
				});

				it("should add floobits to the readme.md", function () {
					_yeomanGenerator.assert.fileContent("README.md", /floobits\.com/);
				});
			});

			describe("(source code management)", function () {
				it("should create utiliy git files", function () {
					_yeomanGenerator.assert.file([".gitignore"]);
				});
			});
		});

		describe("(testing)", function () {
			it("should create files for karma", function () {
				_yeomanGenerator.assert.file([".karma.conf.js"]);
			});

			it("should create files for sauce labs", function () {
				_yeomanGenerator.assert.file([".sauce.json"]);
			});

			it("should add sauce labs to the readme.md", function () {
				_yeomanGenerator.assert.fileContent("README.md", /saucelabs\.com/);
			});
		});

		describe("(continuous integration)", function () {
			it("should create files for Travis CI", function () {
				_yeomanGenerator.assert.file([".travis.yml"]);
			});

			it("should add travis to the readme.md", function () {
				_yeomanGenerator.assert.fileContent("README.md", /travis-ci\.org/);
			});
		});

		describe("(automation)", function () {
			it("should create gulp related files", function () {
				_yeomanGenerator.assert.file(["gulpfile.babel.js", "tasks/clean.js", "tasks/build.js", "tasks/build-lib.js", "tasks/build-lib-assets.js", "tasks/build-spec.js", "tasks/build-spec-assets.js", "tasks/test.js", "tasks/test-local.js", "tasks/test-watch.js", "tasks/suppress-errors.js", "tasks/test-browsers.js", "paths.json"]);
			});
		});

		describe("(functionality)", function () {
			it("should generate an index", function () {
				_yeomanGenerator.assert.file(["index.js"]);
			});

			it("should generate a mock entry point with his test", function () {
				_yeomanGenerator.assert.file(["es6/lib/" + answers["true"].name + ".js", "es6/spec/" + answers["true"].name + ".spec.js"]);
			});

			//suspended due to the time that takes to install dependencies
			//tested also with the actual yo command
			xit("should create es5 compatible files", function () {
				_yeomanGenerator.assert.file(["es5/lib/" + answers["true"].name + ".js", "es5/spec/" + answers["true"].name + ".spec.js"]);
			});
		});
	});

	describe("(updating)", function () {
		var readmeContent = undefined,
		    packageContent = undefined;

		before(function (done) {
			readmeContent = "# some content";
			packageContent = "{\"dependencies\": {\"debug\": \"latest\"}}";

			context = _yeomanGenerator.test.run(_path2["default"].join(__dirname, "../../generators/app")).inDir(basePath, function () {
				//create README.md
				_fs2["default"].appendFileSync("./README.md", readmeContent);
				//create package.json
				_fs2["default"].appendFileSync("./package.json", packageContent);
				//run generator
				_fs2["default"].mkdirSync(_path2["default"].join(basePath, "es6"));
				//create lib folder
				_fs2["default"].mkdirSync(_path2["default"].join(basePath, "es6/lib"));
				//create spec folder
				_fs2["default"].mkdirSync(_path2["default"].join(basePath, "es6/spec"));
			}).withOptions({ "skip-install": true }).withPrompts(answers["false"]).on("end", done);
		});

		it("should not create anything on the lib folder if it already exists", function () {
			_yeomanGenerator.assert.noFile("es6/lib/" + answers["false"].name + ".js");
		});

		it("should not create anything on the spec folder if it already exists", function () {
			_yeomanGenerator.assert.noFile("es6/spec/" + answers["false"].name + ".spec.js");
		});

		it("should not override the README.md if it already exists", function () {
			_yeomanGenerator.assert.fileContent("README.md", readmeContent);
		});

		it("should not override the package.json if it already exists", function () {
			_yeomanGenerator.assert.fileContent("package.json", /dependencies/);
		});

		it("should not override the package.json if it already exists but add generator version", function () {
			_yeomanGenerator.assert.fileContent("package.json", /generatorVersion/);
		});
	});
});