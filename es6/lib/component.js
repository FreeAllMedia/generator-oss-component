import yeoman from "yeoman-generator";
import yosay from "yosay";
import inflect from "jargon";

const copyFiles = Symbol();

export default class Component extends yeoman.generators.Base {
	initializing() {
		this.pkg = require("../../package.json");
	}

	prompting() {
		let done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			"Welcome to the stylish OSS component generator! our base path is " + this.destinationRoot()
		));

		let prompts = [{
			type: "input",
			name: "name",
			message: "What is the component name? (camel case please => exactlyLikeThis)",
			default: "myComponent"
		},{
			type: "input",
			name: "description",
			message: "What is the component description?",
			default: "This is a component to say something."
		},{
			type: "input",
			name: "organizationName",
			message: "What is your organization name?",
			default: "Free All Media LLC"
		},{
			type: "confirm",
			name: "floobits",
			message: "There is a Floobits workspace for this repo?",
			default: true
		},{
			type: "confirm",
			name: "sauceLabs",
			message: "do you want to add SauceLabs?",
			default: true
		},{
			type: "confirm",
			name: "travis",
			message: "do you want to add Travis support?",
			default: true
		}];

		// https://github.com/FreeAllMedia/jargon
		this.prompt(prompts, function (newProperties) {
			this.properties = newProperties;
			this.properties.organizationNameCamelCase = inflect(this.properties.organizationName).camel.toString();

			prompts = [{
					type: "input",
					name: "floobitsWorkspace",
					message: "What is the floobits workspace url?",
					default: `https://floobits.com/${this.properties.organizationNameCamelCase}/${this.properties.name}`,
					when:
						() => {
							return this.properties.floobits;
						}
				},{
					type: "input",
					name: "repositoryUrl",
					message: "What is your repo url?",
					default: `https://github.com/${this.properties.organizationNameCamelCase}/${this.properties.name}.git`
				},{
					type: "input",
					name: "issueTrackerUrl",
					message: "What is the issue tracker url for the component?",
					default: `https://github.com/${this.properties.organizationNameCamelCase}/${this.properties.name}/issues`
				},{
					type: "input",
					name: "homepage",
					message: "What is the component homepage?",
					default: `https://github.com/${this.properties.organizationNameCamelCase}/${this.properties.name}`
				}];

			this.prompt(prompts, function (newProperties) {
				this.properties.floobitsWorkspace = newProperties.floobitsWorkspace;
				this.properties.repositoryUrl = newProperties.repositoryUrl;
				this.properties.issueTrackerUrl = newProperties.issueTrackerUrl;
				this.properties.homepage = newProperties.homepage;
				done();
			}.bind(this));
		}.bind(this));
	}

	writing() {
		this.context = {
			name: this.properties.name,
			description: this.properties.description,
			floobitsWorkspace: this.properties.floobitsWorkspace,
			componentNamePascalCase: inflect(this.properties.name).pascal.toString(),
			organizationName: this.properties.organizationName,
			travisKey: null,
			homepage: this.properties.homepage,
			repositoryUrl: this.properties.repositoryUrl,
			issueTrackerUrl: this.properties.issueTrackerUrl
		};

		// copy files
		this[copyFiles](["_.codeclimate.yml",
			"_.sauce.json",
			"_.eslintrc",
			"_.floo",
			"_.flooignore",
			"_.gitignore",
			"_.jshintrc",
			"_.karma.conf.js",
			"_LICENSE.md",
			"_README.md",
			"_package.json",
			"_gulpfile.babel.js",
			"_index.js",
			"_paths.json",
			"tasks/_build.js",
			"tasks/_build-lib.js",
			"tasks/_build-spec.js",
			"tasks/_test-local.js",
			"tasks/_test-browsers.js",
			"tasks/_test.js",
			"es6/lib/_##componentName##.js",
			"es6/spec/_##componentName##.spec.js"]
		);

		if(this.properties.floobits) {
			this[copyFiles](["_.floo", "_.flooignore"]);
		}

		if(this.properties.sauceLabs) {
			this[copyFiles](["_.sauce.json"]);
		}

		if(this.properties.travis) {
			this[copyFiles](["_.travis.yml"]);
		}
	}

	[copyFiles](files) {
		files.forEach((templatePath) => {
			let newName = templatePath.replace("_", "");
			newName = newName.replace("##componentName##", this.context.name);
			this.fs.copyTpl(
				this.templatePath(templatePath),
				this.destinationPath(`${this.context.name}/${newName}`),
				this.context
			);
		}, this);
	}

	install() {
		this.installDependencies({
			callback: function callbackInstallDependencies() {
				this.spawnCommand("gulp", ["build"]);
			}.bind(this)
		});
	}

}
