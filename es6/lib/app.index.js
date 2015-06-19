import yeoman from "yeoman-generator";
import yosay from "yosay";
import inflect from "jargon";
import encrypt from "travis-encrypt";
import childProcess from "child_process";
import fs from "fs";

const copyFilesIf = Symbol(),
  installAndTest = Symbol();

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
		}, {
			type: "input",
			name: "description",
			message: "What is the component description?",
			default: "This is a component to say something."
		}, {
      type: "input",
      name: "organizationName",
      message: "What is your organization name?",
      default: "Free All Media"
    }, {
      type: "input",
      name: "organizationType",
      message: "What is your organization type?",
      default: "LLC"
    }, {
			type: "confirm",
			name: "floobits",
			message: "There is a Floobits workspace for this repo (Development Real-time Collaboration)?",
			default: true
		}, {
			type: "confirm",
			name: "sauceLabs",
			message: "do you want to add SauceLabs (Cross Browser Testing)?",
			default: true
		}, {
      type: "confirm",
      name: "travis",
      message: "do you want to add Travis (Continuous Integration) support?",
      default: true
    }, {
      type: "confirm",
      name: "codeClimate",
      message: "do you want to add Code Climate (Code Quality) support?",
      default: true
    }, {
      type: "confirm",
      name: "david",
      message: "do you want to add David (Dependency Management) support?",
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
				}, {
					type: "input",
					name: "issueTrackerUrl",
					message: "What is the issue tracker url for the component?",
					default: `https://github.com/${this.properties.repoSuffix}/issues`
				}, {
          type: "input",
          name: "homepage",
          message: "What is the component homepage?",
          default: `https://github.com/${this.properties.repoSuffix}`
        }, {
          type: "input",
          name: "floobitsWorkspace",
          message: "What is the floobits workspace url?",
          default: `https://floobits.com/${this.properties.repoSuffix}`,
          when:
            () => {
              return this.properties.floobits;
            }
        }, {
          type: "input",
          name: "sauceLabsUserName",
          message: "Please provide the user name for Sauce Labs (if the Travis slug is already linked, we will encrypt it into the travis yaml for you)",
          default: `${this.properties.organizationNameCamelCase}`,
          when:
            () => {
              return this.properties.sauceLabs;
            }
        }, {
          type: "input",
          name: "sauceLabsAccessToken",
          message: "Paste here the access token for Sauce Labs (we will encrypt it for you, too)",
          default: ``,
          when:
            () => {
              return this.properties.sauceLabs;
            }
        }, {
          type: "input",
          name: "codeClimateRepo",
          message: "Paste here the Code Climate Repo code",
          default: ``,
          when:
            () => {
              return this.properties.codeClimate;
            }
        }, {
          type: "input",
          name: "codeClimateBadge",
          message: "Paste here the Code Climate Badge code",
          default: ``,
          when:
            () => {
              return this.properties.codeClimate;
            }
        }, {
          type: "input",
          name: "codeClimateRepoToken",
          message: "Paste here the Code Climate Badge Token for test coverage",
          default: ``,
          when:
            () => {
              return this.properties.codeClimate;
            }
        }, {
          type: "input",
          name: "davidRepo",
          message: "Confirm or paste a new David url",
          default: `https://david-dm.org/${this.properties.repoSuffix}`,
          when:
            () => {
              return this.properties.david;
            }
        }];

			this.prompt(prompts, function (newProperties) {
        // Object.assign(this.properties, newProperties);
				this.properties.floobitsWorkspace = newProperties.floobitsWorkspace;
				this.properties.repositoryUrl = newProperties.repositoryUrl;
				this.properties.issueTrackerUrl = newProperties.issueTrackerUrl;
				this.properties.homepage = newProperties.homepage;
        this.properties.sauceLabsAccessToken = newProperties.sauceLabsAccessToken;
        this.properties.sauceLabsUserName = newProperties.sauceLabsUserName;
        this.properties.codeClimateRepo = newProperties.codeClimateRepo;
        this.properties.codeClimateBadge = newProperties.codeClimateBadge;
        this.properties.codeClimateRepoToken = newProperties.codeClimateRepoToken;
        this.properties.davidRepo = newProperties.davidRepo;
        done();
			}.bind(this));
		}.bind(this));
	}

	writing() {
    this.context = {
			name: this.properties.name,
			description: this.properties.description,
      floobits: this.properties.floobits,
			floobitsWorkspace: this.properties.floobitsWorkspace,
      organizationNamePascalCase: this.properties.organizationNamePascalCase,
			componentNamePascalCase: inflect(this.properties.name).pascal.toString(),
			organizationName: this.properties.organizationName,
      organizationType: this.properties.organizationType,
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
      const commandString = `node`;
      const result = childProcess.spawnSync(
        commandString,
        [`${__dirname}/../../node_modules/travis-encrypt/bin/travis-encrypt-cli.js`, `-ar`, `${this.properties.repoSuffix}`, `SAUCE_USERNAME=${this.properties.sauceLabsUserName}`, `SAUCE_ACCESS_TOKEN=${this.properties.sauceLabsAccessToken}`, `CODECLIMATE_REPO_TOKEN=${this.properties.codeClimateRepo}`],
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
