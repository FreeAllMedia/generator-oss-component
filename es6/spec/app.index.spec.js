import path from "path";
import {assert, test as helpers} from "yeoman-generator";
import os from "os";
import fs from "fs";
import rimraf from "rimraf";
import chai from "chai";

chai.should();

const basePath = path.join(os.tmpdir(), "/temp-test");

describe("oss-component generator", function() {
	let context,
		answers;

	this.timeout(10000); // Yeoman generation can sometimes take longer than 2 seconds. Let's give it 10.

	before(() => {
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

				"codeQuality": "codeClimate",

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

				"codeQuality": "none",

				"gitHub": false
			}
		};
	});

	describe("(with all false)", () => {

		before(done => {
			//create initial files and dires with a certain content
			rimraf(basePath, () => {
				context = helpers.run(path.join(__dirname, "../../generators/app"))
					.inDir(basePath)
					.withOptions({ "skip-install": true })
					.withPrompts(answers.false)
					.on("end", done);
			});
		});

		describe("(general information)", () => {
			it("should set name property correctly", () => {
				console.log("context is ", context.generator.context);
				context.generator.context.name.should.equal(answers.false.name);
			});

			it("should set description property correctly", () => {
				context.generator.context.description.should.equal(answers.false.description);
			});

			it("should set organizationName property correctly", () => {
				context.generator.context.organizationName.should.equal(answers.false.organizationName);
			});

			it("should set repositoryUrl property correctly", () => {
				context.generator.context.repositoryUrl.should.equal(answers.false.repositoryUrl);
			});

			it("should set issueTrackerUrl property correctly", () => {
				context.generator.context.issueTrackerUrl.should.equal(answers.false.issueTrackerUrl);
			});

			it("should set homepage property correctly", () => {
				context.generator.context.homepage.should.equal(answers.false.homepage);
			});
		});

		describe("(code quality)", () => {
			it("should add nothing with codeclimate to the readme.md", () => {
				assert.noFileContent("README.md", /codeclimate\.com/);
			});
		});

		describe("(dependency management)", () => {
			it("should not add nothing with david dm to the readme.md", () => {
				assert.noFileContent("README.md", /david-dm\.org/);
			});
		});

		describe("(collaboration support)", () => {
			describe("(coding)", () => {
				it("should not create files for floobits support", () => {
					assert.noFile([`.floo`, `.flooignore`]);
				});

				it("should not add nothing with codeclimate to the readme.md", () => {
					assert.noFileContent("README.md", /floobits\.com/);
				});
			});
		});

		describe("(testing)", () => {
			it("should not create files for sauce labs", () => {
				assert.noFile([`.sauce.json`]);
			});

			it("should not add nothing with codeclimate to the readme.md", () => {
				assert.noFileContent("README.md", /saucelabs\.com/);
			});
		});

		describe("(continuous integration)", () => {
			it("should not create files for Travis CI", () => {
				assert.noFile([`.travis.yml`]);
			});

			it("should not add nothing with codeclimate to the readme.md", () => {
				assert.noFileContent("README.md", /travis-ci\.org/);
			});
		});
	});

	describe("(with all true)", () => {

		before(done => {
			rimraf(basePath, () => {
				context = helpers.run(path.join(__dirname, "../../generators/app"))
					.inDir(basePath)
					.withOptions({ "skip-install": true })
					.withPrompts(answers.true)
					.on("end", done);
			});
		});

		describe("(template context)", () => {
			describe("(general information)", () => {
				it("should set name property correctly", () => {
					context.generator.context.name.should.equal(answers.true.name);
				});

				it("should set description property correctly", () => {
					context.generator.context.description.should.equal(answers.true.description);
				});

				it("should set organizationName property correctly", () => {
					context.generator.context.organizationName.should.equal(answers.true.organizationName);
				});

				it("should set gitHubAccountName property correctly", () => {
					context.generator.context.gitHubAccountName.should.equal(answers.true.gitHubAccountName);
				});

				it("should set repositoryUrl property correctly", () => {
					context.generator.context.repositoryUrl.should.equal(answers.true.repositoryUrl);
				});

				it("should set issueTrackerUrl property correctly", () => {
					context.generator.context.issueTrackerUrl.should.equal(answers.true.issueTrackerUrl);
				});

				it("should set homepage property correctly", () => {
					context.generator.context.homepage.should.equal(answers.true.homepage);
				});
			});

			describe("(floobits)", () => {
				it("should set floobits correctly", () => {
					context.generator.context.floobits.should.equal(answers.true.floobits);
				});

				it("should set floobits workspace correctly", () => {
					context.generator.context.floobitsWorkspace.should.equal(answers.true.floobitsWorkspace);
				});
			});

			describe("(codeclimate)", () => {
				it("should set codeQuality correctly", () => {
					context.generator.context.codeQuality.should.equal(answers.true.codeQuality);
				});
			});

			describe("(david)", () => {
				it("should set david correctly", () => {
					context.generator.context.david.should.equal(answers.true.david);
				});

				it("should set davidRepo workspace correctly", () => {
					context.generator.context.davidRepo.should.equal(answers.true.davidRepo);
				});
			});

			describe("(sauceLabs)", () => {
				it("should set sauceLabs correctly", () => {
					context.generator.context.sauceLabs.should.equal(answers.true.sauceLabs);
				});

				it("should set sauceLabsUserName workspace correctly", () => {
					context.generator.context.sauceLabsUserName.should.equal(answers.true.sauceLabsUserName);
				});

				it("should set sauceLabsAccessToken workspace correctly", () => {
					context.generator.context.sauceLabsAccessToken.should.equal(answers.true.sauceLabsAccessToken);
				});
			});
		});

		describe("(licensing)", () => {
			it("should create a LICENSE file", () => {
				assert.file([`LICENSE`]);
			});
		});

		describe("(documentation)", () => {
			it("should create a README file", () => {
				assert.file([`README.md`]);
			});
		});

		describe("(package-description)", () => {
			it("should create a package.json file", () => {
				assert.file([`package.json`]);
			});
		});

		describe("(code quality)", () => {
			it("should add code climate to the readme.md", () => {
				assert.fileContent("README.md", /codeclimate\.com/);
			});

			describe("(linting)", () => {
				it("should generate an eslint file", () => {
					assert.file([`.eslintrc`]);
				});

				it("should generate an jshint file", () => {
					assert.file([`.jshintrc`]);
				});
			});

			describe("(editorconfig)", () => {
				it("should generate a file for the IDE", () => {
					assert.file(".editorconfig");
				});
			});
		});

		describe("(dependency management)", () => {
			it("should add david dm to the readme.md", () => {
				assert.fileContent("README.md", /david-dm\.org/);
			});
		});

		describe("(collaboration support)", () => {
			describe("(coding)", () => {
				it("should create files for floobits support", () => {
					assert.file([`.floo`, `.flooignore`]);
				});

				it("should add floobits to the readme.md", () => {
					assert.fileContent("README.md", /floobits\.com/);
				});
			});

			describe("(source code management)", () => {
				it("should create utiliy git files", () => {
					assert.file([`.gitignore`]);
				});
			});
		});

		describe("(testing)", () => {
			it("should create files for karma", () => {
				assert.file([`.karma.conf.js`]);
			});

			it("should create files for sauce labs", () => {
				assert.file([`.sauce.json`]);
			});

			it("should add sauce labs to the readme.md", () => {
				assert.fileContent("README.md", /saucelabs\.com/);
			});
		});

		describe("(continuous integration)", () => {
			it("should create files for Travis CI", () => {
				assert.file([`.travis.yml`]);
			});

			it("should add travis to the readme.md", () => {
				assert.fileContent("README.md", /travis-ci\.org/);
			});
		});

		describe("(automation)", () => {
			it("should create gulp related files", () => {
				assert.file([`gulpfile.babel.js`,
					`tasks/build.js`,
					`tasks/build-lib.js`,
					`tasks/build-lib-assets.js`,
					`tasks/build-spec.js`,
					`tasks/build-spec-assets.js`,
					`tasks/test.js`,
					`tasks/test-local.js`,
					`tasks/test-browsers.js`,
					`paths.json`
				]);
			});
		});

		describe("(functionality)", () => {
			it("should generate an index", () => {
				assert.file([`index.js`]);
			});

			it("should generate a mock entry point with his test", () => {
				assert.file([`es6/lib/${answers.true.name}.js`,
					`es6/spec/${answers.true.name}.spec.js`
				]);
			});

			//suspended due to the time that takes to install dependencies
			//tested also with the actual yo command
			xit("should create es5 compatible files", () => {
				assert.file([`es5/lib/${answers.true.name}.js`,
					`es5/spec/${answers.true.name}.spec.js`
				]);
			});
		});
	});

	describe("(updating)", () => {
		let readmeContent,
			packageContent;

		before(done => {
			readmeContent = "# some content";
			packageContent = `{"dependencies": {"debug": "latest"}}`;

			context = helpers.run(path.join(__dirname, "../../generators/app"))
				.inDir(basePath, () => {
					//create README.md
					fs.appendFileSync("./README.md", readmeContent);
					//create package.json
					fs.appendFileSync("./package.json", packageContent);
					//run generator
					fs.mkdirSync(path.join(basePath, "es6"));
					//create lib folder
					fs.mkdirSync(path.join(basePath, "es6/lib"));
					//create spec folder
					fs.mkdirSync(path.join(basePath, "es6/spec"));
				})
				.withOptions({ "skip-install": true })
				.withPrompts(answers.false)
				.on("end", done);
		});

		it("should not create anything on the lib folder if it already exists", () => {
			assert.noFile(`es6/lib/${answers.false.name}.js`);
		});

		it("should not create anything on the spec folder if it already exists", () => {
			assert.noFile(`es6/spec/${answers.false.name}.spec.js`);
		});

		it("should not override the README.md if it already exists", () => {
			assert.fileContent(`README.md`, readmeContent);
		});

		it("should not override the package.json if it already exists", () => {
			assert.fileContent(`package.json`, packageContent);
		});
	});
});
