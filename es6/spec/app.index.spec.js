import path from "path";
import {assert, test as helpers} from "yeoman-generator";
import os from "os";
import fs from "fs";
import rimraf from "rimraf";
import sinon from "sinon";

describe("oss-component generator", function() {
	let name,
		runningContext,
		falseRunningContext,
		floobitsAnswer,
		descriptionAnswer,
		organizationNameAnswer,
		sauceLabsAnswer,
		travisAnswer,
		floobitsWorkspaceAnswer,
		repositoryUrlAnswer,
		issueTrackerUrlAnswer,
		homepageAnswer,
		sauceLabsAccessTokenAnswer,
		sauceLabsUserNameAnswer,
		davidAnswer,
		davidRepoAnswer,
		codeClimateAnswer,
		codeClimateRepoAnswer,
		codeClimateRepoTokenAnswer,

		gitHubOrganizationNameAnswer,
		gitHubClientIdAnswer,
		gitHubClientSecretAnswer;

	this.timeout(10 * 1000);

	before(() => {
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

	describe("(with all false)", () => {

		before(done => {
			const basePath = path.join(os.tmpdir(), "/temp-test-false");
			//create initial files and dires with a certain content
			rimraf(basePath, () => {
				falseRunningContext = helpers.run(path.join(__dirname, "../../generators/app"))
					.inDir(basePath)
					.withOptions({ "skip-install": true })
					.withPrompts({
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
					})
					.on("end", done);
			});
		});

		describe("(general information)", () => {
			it("should set name property correctly", () => {
				falseRunningContext.generator.context.name.should.equal(name);
			});

			it("should set description property correctly", () => {
				falseRunningContext.generator.context.description.should.equal(descriptionAnswer);
			});

			it("should set organizationName property correctly", () => {
				falseRunningContext.generator.context.organizationName.should.equal(organizationNameAnswer);
			});

			it("should set gitHubOrganizationName property correctly", () => {
				falseRunningContext.generator.context.gitHubOrganizationName.should.equal(gitHubOrganizationNameAnswer);
			});

			it("should set repositoryUrl property correctly", () => {
				falseRunningContext.generator.context.repositoryUrl.should.equal(repositoryUrlAnswer);
			});

			it("should set issueTrackerUrl property correctly", () => {
				falseRunningContext.generator.context.issueTrackerUrl.should.equal(issueTrackerUrlAnswer);
			});

			it("should set homepage property correctly", () => {
				falseRunningContext.generator.context.homepage.should.equal(homepageAnswer);
			});
		});

		describe("(code quality)", () => {
			it("should not create files for code climate support", () => {
				assert.noFile([`.codeclimate.yml`, `tasks/codeClimate.js`]);
			});

			it("should not add nothing with codeclimate to the readme.md", () => {
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
			const basePath = path.join(os.tmpdir(), "/temp-test");
			rimraf(basePath, () => {
				runningContext = helpers.run(path.join(__dirname, "../../generators/app"))
					.inDir(basePath)
					.withOptions({ "skip-install": true })
					.withPrompts({
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
					})
					.on("end", done);
			});
		});

		describe("(template context)", () => {
			describe("(general information)", () => {
				it("should set name property correctly", () => {
					runningContext.generator.context.name.should.equal(name);
				});

				it("should set description property correctly", () => {
					runningContext.generator.context.description.should.equal(descriptionAnswer);
				});

				it("should set organizationName property correctly", () => {
					runningContext.generator.context.organizationName.should.equal(organizationNameAnswer);
				});

				it("should set gitHubOrganizationName property correctly", () => {
					runningContext.generator.context.gitHubOrganizationName.should.equal(gitHubOrganizationNameAnswer);
				});

				it("should set gitHubClientId property correctly", () => {
					runningContext.generator.context.gitHubClientId.should.equal(gitHubClientIdAnswer);
				});

				it("should set gitHubClientSecret property correctly", () => {
					runningContext.generator.context.gitHubClientSecret.should.equal(gitHubClientSecretAnswer);
				});

				it("should set repositoryUrl property correctly", () => {
					runningContext.generator.context.repositoryUrl.should.equal(repositoryUrlAnswer);
				});

				it("should set issueTrackerUrl property correctly", () => {
					runningContext.generator.context.issueTrackerUrl.should.equal(issueTrackerUrlAnswer);
				});

				it("should set homepage property correctly", () => {
					runningContext.generator.context.homepage.should.equal(homepageAnswer);
				});
			});

			describe("(floobits)", () => {
				it("should set floobits correctly", () => {
					runningContext.generator.context.floobits.should.equal(floobitsAnswer);
				});

				it("should set floobits workspace correctly", () => {
					runningContext.generator.context.floobitsWorkspace.should.equal(floobitsWorkspaceAnswer);
				});
			});

			describe("(codeclimate)", () => {
				it("should set codeClimate correctly", () => {
					runningContext.generator.context.codeClimate.should.equal(codeClimateAnswer);
				});

				it("should set codeClimateRepo workspace correctly", () => {
					runningContext.generator.context.codeClimateRepo.should.equal(codeClimateRepoAnswer);
				});

				it("should set codeClimateRepoToken workspace correctly", () => {
					runningContext.generator.context.codeClimateRepoToken.should.equal(codeClimateRepoTokenAnswer);
				});
			});

			describe("(david)", () => {
				it("should set david correctly", () => {
					runningContext.generator.context.david.should.equal(davidAnswer);
				});

				it("should set davidRepo workspace correctly", () => {
					runningContext.generator.context.davidRepo.should.equal(davidRepoAnswer);
				});
			});

			describe("(sauceLabs)", () => {
				it("should set sauceLabs correctly", () => {
					runningContext.generator.context.sauceLabs.should.equal(sauceLabsAnswer);
				});

				it("should set sauceLabsUserName workspace correctly", () => {
					runningContext.generator.context.sauceLabsUserName.should.equal(sauceLabsUserNameAnswer);
				});

				it("should set sauceLabsAccessToken workspace correctly", () => {
					runningContext.generator.context.sauceLabsAccessToken.should.equal(sauceLabsAccessTokenAnswer);
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
			it("should create files for code climate support", () => {
				assert.file([`.codeclimate.yml`, `tasks/codeClimate.js`]);
				//autogenerated `lcov.info`
			});

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
					`tasks/build-spec.js`,
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
				assert.file([`es6/lib/${name}.js`,
					`es6/spec/${name}.spec.js`
				]);
			});

			//suspended due to the time that takes to install dependencies
			//tested also with the actual yo command
			xit("should create es5 compatible files", () => {
				assert.file([`es5/lib/${name}.js`,
					`es5/spec/${name}.spec.js`
				]);
			});
		});
	});

	describe("(updating)", () => {
		let readmeContent,
			packageContent;

		before(done => {
			const basePath = path.join(os.tmpdir(), "/temp-test-override");
			readmeContent = "# some content";
			packageContent = `{"dependencies": {"debug": "latest"}}`;

			falseRunningContext = helpers.run(path.join(__dirname, "../../generators/app"))
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
				.withPrompts({
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
				})
				.on("end", done);
		});

		it("should not create anything on the lib folder if it already exists", () => {
			assert.noFile(`es6/lib/${name}.js`);
		});

		it("should not create anything on the spec folder if it already exists", () => {
			assert.noFile(`es6/spec/${name}.spec.js`);
		});

		it("should not override the README.md if it already exists", () => {
			assert.fileContent(`README.md`, readmeContent);
		});

		it("should not override the package.json if it already exists", () => {
			assert.fileContent(`package.json`, packageContent);
		});
	});
});
