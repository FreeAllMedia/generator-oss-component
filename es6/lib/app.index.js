import yeoman from "yeoman-generator";
import yosay from "yosay";
import inflect from "jargon";
import encrypt from "travis-encrypt";
import childProcess from "child_process";
import async from "async";
import fs from "fs";

const copyFilesIf = Symbol(),
	installAndTest = Symbol();



export default class Component extends yeoman.generators.Base {
	initializing() {
		this.pkg = require("../../package.json");
	}

	prompting() {
		const done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			"Welcome to the stylish OSS component generator! Let's begin with some questions about the component itself:"
		));

		askComponentQuestions.bind(this)();

		function askComponentQuestions() {
			this.prompt([
				{
					type: "input",
					name: "name",
					message: "What is the component's package name? (in camel case; exactlyLikeThis)",
					default: "myComponent"
				},
				{
					type: "input",
					name: "description",
					message: "How would you quickly describe the component?",
					default: "It cuts fries. It dices onions."
				},
				{
					type: "input",
					name: "organizationName",
					message: "What is your organization name?",
					default: "Free All Media, LLC"
				}
			], (answers) => {
				this.properties = answers;
				askRespositoryQuestions.bind(this)();
			});
		}

		function askRespositoryQuestions() {
			this.prompt([
				{
					type: "confirm",
					name: "gitHub",
					message: "Are you using GitHub?"
				}
			], (answers) => {
				for (let answerName in answers) {
					this.properties[answerName] = answers[answerName];
				}

				if (this.properties.gitHub) {
					askGitHubQuestions.bind(this)();
				} else {
					askGenericRepositoryQuestions.bind(this)();
				}
			});
		}

		function askGenericRepositoryQuestions() {
			this.prompt([
				{
					type: "input",
					name: "repositoryUrl",
					message: "What is your repository url?",
					default: `https://something.com/something.git`,
					when: () => {
						return !this.properties.gitHub;
					}
				},
				{
					type: "input",
					name: "homepage",
					message: "What is the component homepage?",
					default: `https://yoursite.com/`,
					when: () => {
						return !this.properties.gitHub;
					}
				}
			], (answers) => {
				for (let answerName in answers) {
					this.properties[answerName] = answers[answerName];
				}

				askCollaborationQuestions.bind(this)();
			});
		}

		function askGitHubQuestions() {
			this.prompt([
				{
					type: "input",
					name: "gitHubOrganizationName",
					message: "What is your organization name or username on GitHub?",
					default: "FreeAllMedia",
					when: () => {
						return this.properties.gitHub;
					}
				},
				{
					type: "input",
					name: "repositoryUrl",
					message: "What is your repository url?",
					default: `https://github.com/${this.properties.gitHubOrganizationName}/${this.properties.name}.git`,
					when: () => {
						return this.properties.gitHub;
					}
				},
				{
					type: "input",
					name: "issueTrackerUrl",
					message: "What is the issue tracker url for the component?",
					default: `https://github.com/${this.properties.gitHubOrganizationName}/${this.properties.name}/issues`,
					when: () => {
						return this.properties.gitHub;
					}
				},
				{
					type: "input",
					name: "homepage",
					message: "What is the component homepage?",
					default: `https://github.com/${this.properties.gitHubOrganizationName}/${this.properties.name}`,
					when: () => {
						return this.properties.gitHub;
					}
				},
				{
					type: "confirm",
					name: "gitHubAutomate",
					message: "Do you want to automatically setup your GitHub repository?",
					when: () => {
						return this.properties.gitHub;
					}
				},
				{
					type: "input",
					name: "gitHubClientId",
					message: "What is your GitHub Client ID?",
					when: () => {
						return this.properties.gitHubAutomate;
					}
				},
				{
					type: "input",
					name: "gitHubClientSecret",
					message: "What is your GitHub Client Secret?",
					when: () => {
						return this.properties.gitHubAutomate;
					}
				}
			], (answers) => {
				for (let answerName in answers) {
					this.properties[answerName] = answers[answerName];
				}
				askCollaborationQuestions.bind(this)();
			});
		}

		function askCollaborationQuestions() {
			this.prompt([
				{
					type: "confirm",
					name: "floobits",
					message: "Do you want this component to integrate with Floobits (Collaborative Coding)?",
					default: false
				},
				{
					type: "input",
					name: "floobitsWorkspace",
					message: "What is the floobits workspace url?",
					default: `https://floobits.com/${this.properties.gitHubOrganizationName}/${this.properties.name}`,
					when:
						() => {
							return this.properties.floobits;
						}
				}
			], (answers) => {
				for (let answerName in answers) {
					this.properties[answerName] = answers[answerName];
				}
				askBrowserTestingQuestions.bind(this)();
			});
		}

		function askBrowserTestingQuestions() {
			this.prompt([
				{
					type: "confirm",
					name: "sauceLabs",
					message: "Do you want this component to integrate with SauceLabs (Cross Browser Testing)?",
					default: false
				},
				{
					type: "input",
					name: "sauceLabsUserName",
					message: "Please provide the user name for Sauce Labs (if the Travis slug is already linked, we will encrypt it into the travis yaml for you)",
					default: `${this.properties.name}`,
					when:
						() => {
							return this.properties.sauceLabs;
						}
				},
				{
					type: "input",
					name: "sauceLabsAccessToken",
					message: "Paste here the access token for Sauce Labs (we will encrypt it for you, too)",
					default: ``,
					when:
						() => {
							return this.properties.sauceLabs;
						}
				}
			], (answers) => {
				for (let answerName in answers) {
					this.properties[answerName] = answers[answerName];
				}
				askContinuousIntegrationQuestions.bind(this)();
			});
		}

		function askContinuousIntegrationQuestions() {
			this.prompt([
				{
					type: "confirm",
					name: "travis",
					message: "Do you want this component to integrate with Travic-CI (Continuous Integration)?",
					default: false
				}
			], (answers) => {
				for (let answerName in answers) {
					this.properties[answerName] = answers[answerName];
				}
				askDependencyManagementQuestions.bind(this)();
			});
		}

		function askDependencyManagementQuestions() {
			this.prompt([
				{
					type: "confirm",
					name: "david",
					message: "Do you want this component to integrate with David-DM? (Dependency Management)?",
					default: false
				},
				{
					type: "input",
					name: "davidRepo",
					message: "Confirm or paste a new David url",
					default: `https://david-dm.org/${this.properties.repoSuffix}`,
					when:
						() => {
							return this.properties.david;
						}
				}
			], (answers) => {
				for (let answerName in answers) {
					this.properties[answerName] = answers[answerName];
				}
				done();
			});
		}

		// const questionFunctions = [];
		// this.properties = {};

		// questionSequence.forEach((questions) => {
		// 	const questionsFunction = (questionsDone) => {
		// 			questionsDone();
		// 		});
		// 	};
		// 	questionFunctions.push(questionsFunction);
		// });

		// async.series(questionFunctions, done);
	}

	writing() {
		this.context = {
			name: this.properties.name,
			description: this.properties.description,
			floobits: this.properties.floobits,
			floobitsWorkspace: this.properties.floobitsWorkspace,
			gitHubOrganizationName: this.properties.gitHubOrganizationName,
			componentNamePascalCase: inflect(this.properties.name).pascal.toString(),
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
			let f = fs.statSync(this.destinationPath("es6/lib"));
		} catch(e) {
			this[copyFilesIf](["es6/lib/_##componentName##.js",
				"es6/spec/_##componentName##.spec.js"]
			);
		}

		this[copyFilesIf](["_README.md",
			"_package.json"], function(destination) {
				try {
					fs.statSync(destination);
					return false;
				} catch(e) {
					return true;
				}
			});

		// copy files
		this[copyFilesIf](["_.eslintrc",
			"_.gitignore",
			"_.jshintrc",
			"_.karma.conf.js",
			"_LICENSE",
			"_gulpfile.babel.js",
			"_index.js",
			"_paths.json",
			"_.editorconfig",
			"tasks/_build.js",
			"tasks/_build-lib.js",
			"tasks/_build-spec.js",
			"tasks/_test-local.js",
			"tasks/_test-browsers.js",
			"tasks/_test.js"]
		);

		if(this.properties.codeClimate) {
			this[copyFilesIf](["_.codeclimate.yml", "tasks/_codeClimate.js",]);
		}

		if(this.properties.floobits) {
			this[copyFilesIf](["_.floo", "_.flooignore"]);
		}

		if(this.properties.sauceLabs) {
			this[copyFilesIf](["_.sauce.json"]);
		}

		if(this.properties.travis) {
			this[copyFilesIf](["_.travis.yml"]);
		}
	}

	install() {
		//generate travis crypted environment vars and append to the travis YAML
		if(this.properties.sauceLabs) {
			const result = childProcess.spawnSync(
				"node",
				[`${__dirname}/../../node_modules/travis-encrypt/bin/travis-encrypt-cli.js`, `-ar`, `${this.properties.repoSuffix}`, `SAUCE_USERNAME=${this.properties.sauceLabsUserName}`, `SAUCE_ACCESS_KEY=${this.properties.sauceLabsAccessToken}`, `CODECLIMATE_REPO_TOKEN=${this.properties.codeClimateRepo}`],
				{
					cwd: `${this.destinationRoot()}`,
					encoding: "utf8"
				}
			);
			if(result.error) {
				process.stdout.write("\nWARNING: TRAVIS ENCRYPT ERROR \n", result.error);
			} else if (result.stderr) {
				process.stdout.write(`\nWARNING: TRAVIS ENCRYPT COMMAND ERROR (maybe repo not found at ${this.properties.repoSuffix}?) \n`);
			}
		}

		this[installAndTest]();
	}

	//PRIVATE METHODS

	[copyFilesIf](files, predicate = function() {return true; }) {
		files.forEach((templatePath) => {
			let newName = templatePath.replace("_", "");
			newName = newName.replace("##componentName##", this.context.name);
			if(predicate(this.destinationPath(newName))) {
				this.fs.copyTpl(
					this.templatePath(templatePath),
					this.destinationPath(`${newName}`),
					this.context
				);
			}
		}, this);
	}

	[installAndTest]() {
		this.installDependencies({
			skipInstall: this.options['skip-install'],
			callback: function callbackInstallDependencies() {
				//gulp test execution if there is a local gulp there already
				if(!this.options['skip-install']) {
					this.spawnCommand("gulp", ["test"]);
				}
			}.bind(this)
		});
	}

}
