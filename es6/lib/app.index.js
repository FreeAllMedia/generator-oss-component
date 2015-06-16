import yeoman from "yeoman-generator";
import yosay from "yosay";
import inflect from "jargon";
import encrypt from "travis-encrypt";
import {exec} from "child_process";

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
      this.properties.organizationNamePascalCase = inflect(this.properties.organizationName).camel.pascal.toString();
      this.properties.repoSuffix = `${this.properties.organizationNamePascalCase}/${this.properties.name}`;

			prompts = [{
					type: "input",
					name: "repositoryUrl",
					message: "What is your repo url?",
					default: `https://github.com/${this.properties.repoSuffix}.git`
				},{
					type: "input",
					name: "issueTrackerUrl",
					message: "What is the issue tracker url for the component?",
					default: `https://github.com/${this.properties.repoSuffix}/issues`
				},{
          type: "input",
          name: "homepage",
          message: "What is the component homepage?",
          default: `https://github.com/${this.properties.repoSuffix}`
        },{
          type: "input",
          name: "floobitsWorkspace",
          message: "What is the floobits workspace url?",
          default: `https://floobits.com/${this.properties.repoSuffix}`,
          when:
            () => {
              return this.properties.floobits;
            }
        },{
          type: "input",
          name: "sauceLabsUserName",
          message: "Please provide the user name for Sauce Labs (we will encrypt it into the travis yaml for you)",
          default: `${this.properties.organizationNameCamelCase}`,
          when:
            () => {
              return this.properties.sauceLabs;
            }
        },{
          type: "input",
          name: "sauceLabsAccessToken",
          message: "Paste here the access token for Sauce Labs (we will encrypt it for you, too)",
          default: ``,
          when:
            () => {
              return this.properties.sauceLabs;
            }
        }];

			this.prompt(prompts, function (newProperties) {
        // Object.assign(this.properties, newProperties);
				this.properties.floobitsWorkspace = newProperties.floobitsWorkspace;
				this.properties.repositoryUrl = newProperties.repositoryUrl;
				this.properties.issueTrackerUrl = newProperties.issueTrackerUrl;
				this.properties.homepage = newProperties.homepage;
        if(this.properties.sauceLabs) {
          console.log("using travis repoSuffix ", this.properties.repoSuffix);
          exec(`../../node_modules/travis-encrypt/bin/travis-encrypt-cli.js -r ${this.properties.repoSuffix} SAUCE_USERNAME=${newProperties.sauceLabsUserName} SAUCE_ACCESS_TOKEN=${newProperties.sauceLabsAccessToken}`,
            function execCallback(error, standardOutput, stderr) {
              console.log("standardOutput is ", {stdout: standardOutput, error: error, stderr: stderr});
              done();
            }
          );
          // coomented because of the issue
          // https://github.com/pwmckenna/node-travis-encrypt/issues/10
          // encrypt(this.properties.repoSuffix,
          //     `SAUCE_USERNAME=${newProperties.sauceLabsUserName} SAUCE_ACCESS_TOKEN=${newProperties.sauceLabsAccessToken}`,
          //     function encryptCallback(error, data) {
          //       console.log("encrypt sauce labs", {data: data});
          //       this.properties.travisEnvironment = data;
          //       done();
          //     }.bind(this)
          //   );
        } else {
          done();
        }
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
			homepage: this.properties.homepage,
			repositoryUrl: this.properties.repositoryUrl,
			issueTrackerUrl: this.properties.issueTrackerUrl,
      sauceUserName: this.properties.sauceLabsUserName || "",
      sauceLabsAccessToken: this.properties.sauceLabsAccessToken || ""
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
				this.destinationPath(`${newName}`),
				this.context
			);
		}, this);
	}

	install() {
		this.installDependencies({
      skipInstall: this.options['skip-install'],
			callback: function callbackInstallDependencies() {
        if(!this.skipInstall) {
          this.spawnCommand("gulp", ["test"]);
        }
			}.bind(this)
		});
	}

}
