"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _yeomanGenerator = require("yeoman-generator");

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

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
      codeClimateRepoAnswer = undefined;
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
  });

  describe("(with all false)", function () {

    before(function (done) {
      falseRunningContext = _yeomanGenerator.test.run(_path2["default"].join(__dirname, "../../generators/app")).inDir(_path2["default"].join(_os2["default"].tmpdir(), "/temp-test-false")).withOptions({ "skip-install": true }).withPrompts({
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

    describe("(code quality)", function () {
      it("should not create files for code climate support", function () {
        _yeomanGenerator.assert.noFile([".codeclimate.yml"]);
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
      runningContext = _yeomanGenerator.test.run(_path2["default"].join(__dirname, "../../generators/app")).inDir(_path2["default"].join(_os2["default"].tmpdir(), "/temp-test")).withOptions({ "skip-install": true }).withPrompts({
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
        codeClimateRepo: codeClimateRepoAnswer
      }).on("end", done);
    });

    describe("(template context)", function () {
      describe("(general information)", function () {
        it("should set the context name property correctly", function () {
          runningContext.generator.context.name.should.equal(name);
        });

        it("should set the context description property correctly", function () {
          runningContext.generator.context.description.should.equal(descriptionAnswer);
        });

        it("should set the context organizationName property correctly", function () {
          runningContext.generator.context.organizationName.should.equal(organizationNameAnswer);
        });

        it("should set the context repositoryUrl property correctly", function () {
          runningContext.generator.context.repositoryUrl.should.equal(repositoryUrlAnswer);
        });

        it("should set the context issueTrackerUrl property correctly", function () {
          runningContext.generator.context.issueTrackerUrl.should.equal(issueTrackerUrlAnswer);
        });

        it("should set the context homepage property correctly", function () {
          runningContext.generator.context.homepage.should.equal(homepageAnswer);
        });
      });

      describe("(floobits)", function () {
        it("should set the context for floobits correctly", function () {
          runningContext.generator.context.floobits.should.equal(floobitsAnswer);
        });

        it("should set the context for floobits workspace correctly", function () {
          runningContext.generator.context.floobitsWorkspace.should.equal(floobitsWorkspaceAnswer);
        });
      });

      describe("(codeclimate)", function () {
        it("should set the context for codeClimate correctly", function () {
          runningContext.generator.context.codeClimate.should.equal(codeClimateAnswer);
        });

        it("should set the context for codeClimateRepo workspace correctly", function () {
          runningContext.generator.context.codeClimateRepo.should.equal(codeClimateRepoAnswer);
        });
      });

      describe("(david)", function () {
        it("should set the context for david correctly", function () {
          runningContext.generator.context.david.should.equal(davidAnswer);
        });

        it("should set the context for davidRepo workspace correctly", function () {
          runningContext.generator.context.davidRepo.should.equal(davidRepoAnswer);
        });
      });

      describe("(sauceLabs)", function () {
        it("should set the context for sauceLabs correctly", function () {
          runningContext.generator.context.sauceLabs.should.equal(sauceLabsAnswer);
        });

        it("should set the context for sauceLabsUserName workspace correctly", function () {
          runningContext.generator.context.sauceLabsUserName.should.equal(sauceLabsUserNameAnswer);
        });

        it("should set the context for sauceLabsAccessToken workspace correctly", function () {
          runningContext.generator.context.sauceLabsAccessToken.should.equal(sauceLabsAccessTokenAnswer);
        });
      });
    });

    describe("(licensing)", function () {
      it("should create a LICENSE file", function () {
        _yeomanGenerator.assert.file(["LICENSE.md"]);
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
        _yeomanGenerator.assert.file([".codeclimate.yml"]);
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
});