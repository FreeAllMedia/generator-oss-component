import yeoman from "yeoman-generator";
import yosay from "yosay";
import inflect from "jargon";
import childProcess from "child_process";
import fs from "fs";
import chalk from "chalk";
import async from "flowsync";

const copyFilesIf = Symbol(),
	installAndTest = Symbol();

export default class Component extends yeoman.generators.Base {
	initializing() {
		this.pkg = require("../../package.json");
		this.answers = {};
	}

	prompting() {
		const done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			"Welcome to the stylish OSS component generator! Let's begin with some questions about the component itself:"
		));

		const ask = (questions, callback) => {
			this.prompt(questions, (answers) => {
			for (let answerName in answers) { this.answers[answerName] = answers[answerName]; }
				callback(this.answers);
			});
		};

		const prompts = [
			// Component Details
			(promptComplete) => {
				this.log("Component Details:");
				ask([
					{
						type: "input",
						name: "name",
						message: "What is the component's package name, in camel case? (exactlyLikeThis)",
						default: "myComponent"
					},
					{
						type: "input",
						name: "description",
						message: "How would you describe the component?",
						default: "It cuts fries. It dices onions."
					},
					{
						type: "input",
						name: "organizationName",
						message: "What is your organization name?",
						default: "Free All Media, LLC"
					}
				], () => {
					promptComplete();
				});
			},

			// Repository Details
			(promptComplete) => {
				this.log("Repository Details:");
				ask([
					{
						type: "confirm",
						name: "gitHub",
						message: "Are you using GitHub?"
					}
				], () => {
					if (this.answers.gitHub) {
						askGitHubQuestions(promptComplete);
					} else {
						askGenericRepositoryQuestions(promptComplete);
					}
				});

				const askGenericRepositoryQuestions = (sectionComplete) => {
					ask([
						{
							type: "input",
							name: "repositoryUrl",
							message: "What is your repository url?",
							default: `https://something.com/something.git`
						},
						{
							type: "input",
							name: "issueTrackerUrl",
							message: "What is the issue tracker url for the component?",
							default: `https://somthing.com/${this.answers.name}/issues`
						},
						{
							type: "input",
							name: "homepage",
							message: "What is the component homepage?",
							default: `https://yoursite.com/`
						}
					], () => {
						sectionComplete();
					});
				};

				const askGitHubQuestions = (sectionComplete) => {
					this.log("GitHub:");
					ask([
						{
							type: "input",
							name: "gitHubAccountName",
							message: "What is the GitHub user or organization name that the component will be published under?",
							default: "FreeAllMedia"
						},
						{
							type: "confirm",
							name: "gitHubReady",
							message: "Is the repository already setup on GitHub?",
							default: false
						}
					], (answers) => {
						if (!answers.gitHubReady) {
							askGitHubSetupQuestions(sectionComplete);
						} else {
							askGitHubUrlQuestions(sectionComplete);
						}
					});

					const askGitHubSetupQuestions = (subSectionComplete) => {
						this.log(yosay("Whoa there, partner! You need to create a GitHub repository before you can move on!"));
						this.log(`1. Go to: ${chalk.bold.red("https://github.com/new")}`);
						this.log(`\ta. Create a new repository called "${chalk.bold.yellow(this.answers.gitHubAccountName + "/" + this.answers.name)}"`);
						this.log(`\tb. Use description: "${chalk.bold.yellow(this.answers.description)}"`);
						this.log(`2. Go to: ${chalk.bold.red("https://github.com/" + this.answers.gitHubAccountName + "/" + this.answers.name + "/settings/collaboration")}`);
						this.log(`\ta. Add the appropriate teams as collaborators.`);
						this.log();

						ask([
							{
								type: "input",
								name: "gitHubReady",
								message: "Hit enter after all steps are complete to move on"
							}
						], () => {
							askGitHubUrlQuestions(subSectionComplete);
						});
					};

					const askGitHubUrlQuestions = (subSectionComplete) => {
						ask([
							{
								type: "input",
								name: "repositoryUrl",
								message: "What is your GitHub repository url?",
								default: `https://github.com/${this.answers.gitHubAccountName}/${this.answers.name}.git`
							},
							{
								type: "input",
								name: "issueTrackerUrl",
								message: "What is the issue tracker url for the component?",
								default: `https://github.com/${this.answers.gitHubAccountName}/${this.answers.name}/issues`
							},
							{
								type: "input",
								name: "homepage",
								message: "What is the component homepage?",
								default: `https://github.com/${this.answers.gitHubAccountName}/${this.answers.name}`
							}
						], () => {
							subSectionComplete();
						});
					};
				};
			},

			// Collaborative Coding
			(promptComplete) => {
				this.log("Collaborative Coding:");
				ask([
					{
						type: "confirm",
						name: "floobits",
						message: "Do you want this component to integrate with Floobits?",
						default: false
					}
				], () => {
					if (this.answers.floobits) {
						ask([
							{
								type: "input",
								name: "floobitsWorkspace",
								message: "What is the floobits workspace url?",
								default: `https://floobits.com/${this.answers.gitHubAccountName}/${this.answers.name}`
							}
						], () => {
							promptComplete();
						});
					} else {
						promptComplete();
					}
				});
			},

			// Cross-Browser Testing
			(promptComplete) => {
				this.log("Cross-Browser Testing:");
				ask([
					{
						type: "confirm",
						name: "sauceLabs",
						message: "Do you want this component to integrate with SauceLabs?",
						default: false
					}
				], (answer) => {
					this.answers.sauceLabs = answer.sauceLabs;
					if (this.answers.sauceLabs) {
						// ask([
						// 	{
						// 		type: "confirm",
						// 		name: "sauceLabsReady",
						// 		message: `Do you have a SauceLabs account setup for "${this.answers.name}"?`,
						// 		default: false
						// 	}
						// ], () => {



						// });


						ask([
							{
								type: "input",
								name: "sauceLabsUserName",
								message: "Please provide the user name for Sauce Labs (if the Travis slug is already linked, we will encrypt it into the travis yaml for you)",
								default: `${this.answers.name}`
							},
							{
								type: "input",
								name: "sauceLabsAccessToken",
								message: "Paste here the access token for Sauce Labs (we will encrypt it for you, too)",
								default: ``
							}
						], () => {
							promptComplete();
						});
					} else {
						promptComplete();
					}
				});
			},

			// Code Quality Testing
			(promptComplete) => {
				this.log("Code Quality Testing:");
				ask([
					{
						type: "confirm",
						name: "codeClimate",
						message: "Do you want this component to integrate with CodeClimte?",
						default: false
					}
				], () => {
					promptComplete();
				});
			},

			// Continuous Integration
			(promptComplete) => {
				this.log("Continuous Integration:");
				ask([
					{
						type: "confirm",
						name: "travis",
						message: "Do you want this component to integrate with Travic-CI?",
						default: false
					}
				], () => {
					promptComplete();
				});
			},

			// Depedency Management
			(promptComplete) => {
				this.log("Depedency Management:");
				ask([
					{
						type: "confirm",
						name: "david",
						message: "Do you want this component to integrate with David-DM??",
						default: false
					}
				], () => {
					if (this.answers.david) {
						ask([
							{
								type: "input",
								name: "davidRepo",
								message: "Confirm or paste a new David url",
								default: `https://david-dm.org/${this.answers.gitHubAccountName}/${this.answers.name}`
							}
						], () => {
							promptComplete();
						});
					} else {
						promptComplete();
					}
				});
			}
		];

		async.series(prompts, done);
	}

	configuring() {
	}

	writing() {
		this.context = {};

		for (let propertyName in this.answers) {	this.context[propertyName] = this.answers[propertyName]; }

		this.context.componentNamePascalCase = inflect(this.context.name).pascal.toString();

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

		if(this.answers.codeClimate) {
			this[copyFilesIf](["_.codeclimate.yml", "tasks/_codeClimate.js",]);
		}

		if(this.answers.floobits) {
			this[copyFilesIf](["_.floo", "_.flooignore"]);
		}

		if(this.answers.sauceLabs) {
			this[copyFilesIf](["_.sauce.json"]);
		}

		if(this.answers.travis) {
			this[copyFilesIf](["_.travis.yml"]);
		}
	}

	install() {

		//generate travis crypted environment vars and append to the travis YAML
		if (this.answers.sauceLabs) {
			const result = childProcess.spawnSync(
				"node",
				[`${__dirname}/../../node_modules/travis-encrypt/bin/travis-encrypt-cli.js`, `-ar`, `${this.answers.gitHubAccountName}/${this.answers.name}`, `SAUCE_USERNAME=${this.answers.sauceLabsUserName}`, `SAUCE_ACCESS_KEY=${this.answers.sauceLabsAccessToken}`, `CODECLIMATE_REPO_TOKEN=${this.answers.codeClimateRepo}`],
				{
					cwd: `${this.destinationRoot()}`,
					encoding: "utf8"
				}
			);
			if(result.error) {
				process.stdout.write("\nWARNING: TRAVIS ENCRYPT ERROR \n", result.error);
			} else if (result.stderr) {
				process.stdout.write(`\nWARNING: TRAVIS ENCRYPT COMMAND ERROR (maybe repo not found at ${this.answers.gitHubAccountName}/${this.answers.name}?) \n`);
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
