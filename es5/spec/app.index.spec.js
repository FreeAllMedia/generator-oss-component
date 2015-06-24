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

var _sinon = require("sinon");

var _sinon2 = _interopRequireDefault(_sinon);

describe("oss-component generator", function () {
	var name = undefined,
	    runningContext = undefined,
	    falseRunningContext = undefined,
	    floobitsAnswer = undefined,
	    descriptionAnswer = undefined,
	    organizationNameAnswer = undefined,
	    sauceLabsAnswer = undefined,
	    travisAnswer = undefined,
	    floobitsWorkspaceAnswer = undefined,
	    repositoryUrlAnswer = undefined,
	    issueTrackerUrlAnswer = undefined,
	    homepageAnswer = undefined,
	    sauceLabsAccessTokenAnswer = undefined,
	    sauceLabsUserNameAnswer = undefined,
	    davidAnswer = undefined,
	    davidRepoAnswer = undefined,
	    codeClimateAnswer = undefined,
	    codeClimateRepoAnswer = undefined,
	    codeClimateRepoTokenAnswer = undefined,
	    gitHubOrganizationNameAnswer = undefined,
	    gitHubClientIdAnswer = undefined,
	    gitHubClientSecretAnswer = undefined;

	this.timeout(10 * 1000);

	before(function () {
		name = "jargon";
		floobitsAnswer = true;
		descriptionAnswer = "some description for the component";
		organizationNameAnswer = "Free all media";
		sauceLabsAnswer = true;
		travisAnswer = true;
		floobitsWorkspaceAnswer = "floobits.com/someFlooobitsWorkspaceAnswer";
		repositoryUrlAnswer = "someRepoUrlAnswer";
		issueTrackerUrlAnswer = "someIssueTrackerUrl";
		homepageAnswer = "someHomepageanswer";
		sauceLabsAccessTokenAnswer = "somesaucelabsaccesstokenanswer";
		sauceLabsUserNameAnswer = "somesaucelabsusernameanswer";
		davidAnswer = true;
		davidRepoAnswer = "david-dm.org/somerepo";
		codeClimateAnswer = true;
		codeClimateRepoAnswer = "someCodeClimateRepo";
		codeClimateRepoTokenAnswer = "someCodeClimateRepoTokenAnswer";

		gitHubOrganizationNameAnswer = "FreeAllMedia";
		gitHubClientIdAnswer = "d7cff9b81cf09028a4d2";
		gitHubClientSecretAnswer = "8768b8222a4ffec0bbec81d63add9399320a7c5e";
	});

	describe("(with all false)", function () {

		before(function (done) {
			var basePath = _path2["default"].join(_os2["default"].tmpdir(), "/temp-test-false");
			//create initial files and dires with a certain content
			(0, _rimraf2["default"])(basePath, function () {
				falseRunningContext = _yeomanGenerator.test.run(_path2["default"].join(__dirname, "../../generators/app")).inDir(basePath).withOptions({ "skip-install": true }).withPrompts({
					name: name,
					description: descriptionAnswer,
					organizationName: organizationNameAnswer,
					floobits: false,
					sauceLabs: false,
					travis: false,
					repositoryUrl: repositoryUrlAnswer,
					issueTrackerUrl: issueTrackerUrlAnswer,
					homepage: homepageAnswer,
					david: false,
					codeClimate: false,

					gitHubOrganizationName: gitHubOrganizationNameAnswer,
					gitHubAutomate: false
				}).on("end", done);
			});
		});

		describe("(general information)", function () {
			it("should set name property correctly", function () {
				falseRunningContext.generator.context.name.should.equal(name);
			});

			it("should set description property correctly", function () {
				falseRunningContext.generator.context.description.should.equal(descriptionAnswer);
			});

			it("should set organizationName property correctly", function () {
				falseRunningContext.generator.context.organizationName.should.equal(organizationNameAnswer);
			});

			it("should set gitHubOrganizationName property correctly", function () {
				falseRunningContext.generator.context.gitHubOrganizationName.should.equal(gitHubOrganizationNameAnswer);
			});

			it("should set repositoryUrl property correctly", function () {
				falseRunningContext.generator.context.repositoryUrl.should.equal(repositoryUrlAnswer);
			});

			it("should set issueTrackerUrl property correctly", function () {
				falseRunningContext.generator.context.issueTrackerUrl.should.equal(issueTrackerUrlAnswer);
			});

			it("should set homepage property correctly", function () {
				falseRunningContext.generator.context.homepage.should.equal(homepageAnswer);
			});
		});

		describe("(code quality)", function () {
			it("should not create files for code climate support", function () {
				_yeomanGenerator.assert.noFile([".codeclimate.yml", "tasks/codeClimate.js"]);
			});

			it("should not add nothing with codeclimate to the readme.md", function () {
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

				it("should not add nothing with codeclimate to the readme.md", function () {
					_yeomanGenerator.assert.noFileContent("README.md", /floobits\.com/);
				});
			});
		});

		describe("(testing)", function () {
			it("should not create files for sauce labs", function () {
				_yeomanGenerator.assert.noFile([".sauce.json"]);
			});

			it("should not add nothing with codeclimate to the readme.md", function () {
				_yeomanGenerator.assert.noFileContent("README.md", /saucelabs\.com/);
			});
		});

		describe("(continuous integration)", function () {
			it("should not create files for Travis CI", function () {
				_yeomanGenerator.assert.noFile([".travis.yml"]);
			});

			it("should not add nothing with codeclimate to the readme.md", function () {
				_yeomanGenerator.assert.noFileContent("README.md", /travis-ci\.org/);
			});
		});
	});

	describe("(with all true)", function () {
		before(function (done) {
			var basePath = _path2["default"].join(_os2["default"].tmpdir(), "/temp-test");
			(0, _rimraf2["default"])(basePath, function () {
				runningContext = _yeomanGenerator.test.run(_path2["default"].join(__dirname, "../../generators/app")).inDir(basePath).withOptions({ "skip-install": true }).withPrompts({
					name: name,
					description: descriptionAnswer,
					organizationName: organizationNameAnswer,
					floobits: floobitsAnswer,
					sauceLabs: sauceLabsAnswer,
					travis: travisAnswer,
					floobitsWorkspace: floobitsWorkspaceAnswer,
					repositoryUrl: repositoryUrlAnswer,
					issueTrackerUrl: issueTrackerUrlAnswer,
					homepage: homepageAnswer,
					sauceLabsAccessToken: sauceLabsAccessTokenAnswer,
					sauceLabsUserName: sauceLabsUserNameAnswer,
					david: davidAnswer,
					davidRepo: davidRepoAnswer,
					codeClimate: codeClimateAnswer,
					codeClimateRepo: codeClimateRepoAnswer,
					codeClimateRepoToken: codeClimateRepoTokenAnswer,

					gitHubOrganizationName: gitHubOrganizationNameAnswer,
					gitHubAutomate: true,

					gitHubClientId: gitHubClientIdAnswer,
					gitHubClientSecret: gitHubClientSecretAnswer
				}).on("end", done);
			});
		});

		describe("(template context)", function () {
			describe("(general information)", function () {
				it("should set name property correctly", function () {
					runningContext.generator.context.name.should.equal(name);
				});

				it("should set description property correctly", function () {
					runningContext.generator.context.description.should.equal(descriptionAnswer);
				});

				it("should set organizationName property correctly", function () {
					runningContext.generator.context.organizationName.should.equal(organizationNameAnswer);
				});

				it("should set gitHubOrganizationName property correctly", function () {
					runningContext.generator.context.gitHubOrganizationName.should.equal(gitHubOrganizationNameAnswer);
				});

				it("should set gitHubClientId property correctly", function () {
					runningContext.generator.context.gitHubClientId.should.equal(gitHubClientIdAnswer);
				});

				it("should set gitHubClientSecret property correctly", function () {
					runningContext.generator.context.gitHubClientSecret.should.equal(gitHubClientSecretAnswer);
				});

				it("should set repositoryUrl property correctly", function () {
					runningContext.generator.context.repositoryUrl.should.equal(repositoryUrlAnswer);
				});

				it("should set issueTrackerUrl property correctly", function () {
					runningContext.generator.context.issueTrackerUrl.should.equal(issueTrackerUrlAnswer);
				});

				it("should set homepage property correctly", function () {
					runningContext.generator.context.homepage.should.equal(homepageAnswer);
				});
			});

			describe("(floobits)", function () {
				it("should set floobits correctly", function () {
					runningContext.generator.context.floobits.should.equal(floobitsAnswer);
				});

				it("should set floobits workspace correctly", function () {
					runningContext.generator.context.floobitsWorkspace.should.equal(floobitsWorkspaceAnswer);
				});
			});

			describe("(codeclimate)", function () {
				it("should set codeClimate correctly", function () {
					runningContext.generator.context.codeClimate.should.equal(codeClimateAnswer);
				});

				it("should set codeClimateRepo workspace correctly", function () {
					runningContext.generator.context.codeClimateRepo.should.equal(codeClimateRepoAnswer);
				});

				it("should set codeClimateRepoToken workspace correctly", function () {
					runningContext.generator.context.codeClimateRepoToken.should.equal(codeClimateRepoTokenAnswer);
				});
			});

			describe("(david)", function () {
				it("should set david correctly", function () {
					runningContext.generator.context.david.should.equal(davidAnswer);
				});

				it("should set davidRepo workspace correctly", function () {
					runningContext.generator.context.davidRepo.should.equal(davidRepoAnswer);
				});
			});

			describe("(sauceLabs)", function () {
				it("should set sauceLabs correctly", function () {
					runningContext.generator.context.sauceLabs.should.equal(sauceLabsAnswer);
				});

				it("should set sauceLabsUserName workspace correctly", function () {
					runningContext.generator.context.sauceLabsUserName.should.equal(sauceLabsUserNameAnswer);
				});

				it("should set sauceLabsAccessToken workspace correctly", function () {
					runningContext.generator.context.sauceLabsAccessToken.should.equal(sauceLabsAccessTokenAnswer);
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
			it("should create files for code climate support", function () {
				_yeomanGenerator.assert.file([".codeclimate.yml", "tasks/codeClimate.js"]);
				//autogenerated `lcov.info`
			});

			it("should add code climate to the readme.md", function () {
				_yeomanGenerator.assert.fileContent("README.md", /codeclimate\.com/);
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
				_yeomanGenerator.assert.file(["gulpfile.babel.js", "tasks/build.js", "tasks/build-lib.js", "tasks/build-spec.js", "tasks/test.js", "tasks/test-local.js", "tasks/test-browsers.js", "paths.json"]);
			});
		});

		describe("(functionality)", function () {
			it("should generate an index", function () {
				_yeomanGenerator.assert.file(["index.js"]);
			});

			it("should generate a mock entry point with his test", function () {
				_yeomanGenerator.assert.file(["es6/lib/" + name + ".js", "es6/spec/" + name + ".spec.js"]);
			});

			//suspended due to the time that takes to install dependencies
			//tested also with the actual yo command
			xit("should create es5 compatible files", function () {
				_yeomanGenerator.assert.file(["es5/lib/" + name + ".js", "es5/spec/" + name + ".spec.js"]);
			});
		});
	});

	describe("(updating)", function () {
		var readmeContent = undefined,
		    packageContent = undefined;

		before(function (done) {
			var basePath = _path2["default"].join(_os2["default"].tmpdir(), "/temp-test-override");
			readmeContent = "# some content";
			packageContent = "{\"dependencies\": {\"debug\": \"latest\"}}";

			falseRunningContext = _yeomanGenerator.test.run(_path2["default"].join(__dirname, "../../generators/app")).inDir(basePath, function () {
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
			}).withOptions({ "skip-install": true }).withPrompts({
				name: name,
				description: descriptionAnswer,
				organizationName: organizationNameAnswer,
				floobits: false,
				sauceLabs: false,
				travis: false,
				repositoryUrl: repositoryUrlAnswer,
				issueTrackerUrl: issueTrackerUrlAnswer,
				homepage: homepageAnswer,
				david: false,
				codeClimate: false
			}).on("end", done);
		});

		it("should not create anything on the lib folder if it already exists", function () {
			_yeomanGenerator.assert.noFile("es6/lib/" + name + ".js");
		});

		it("should not create anything on the spec folder if it already exists", function () {
			_yeomanGenerator.assert.noFile("es6/spec/" + name + ".spec.js");
		});

		it("should not override the README.md if it already exists", function () {
			_yeomanGenerator.assert.fileContent("README.md", readmeContent);
		});

		it("should not override the package.json if it already exists", function () {
			_yeomanGenerator.assert.fileContent("package.json", packageContent);
		});
	});
});