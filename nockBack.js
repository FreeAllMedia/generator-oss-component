"use strict";
var nockBack = require("nock").back;
var GitHubApi = require("github");

nockBack.setMode("record");

nockBack.fixtures = __dirname + "/es6/spec/fixtures"; //this only needs to be set once in your test helper

let gitHub = new GitHubApi({version: "3.0.0"});

gitHub.authenticate({
	type: "oauth",
	token: "81c44ba9b43a14591914452429d217a77e2bc85d"
});

// recording of the fixture
nockBack("getRepos.json", function(getReposDone) {
	gitHub.repos.get({
		user: "dcrockwell",
		repo: "automationTester"
	}, function (error, repository) {
		//if (error) { throw error; }
		getReposDone();

		if (repository) {
			console.log("Deleting Repo");
			nockBack("deleteRepo.json", function (deleteRepoDone) {
				gitHub.repos.delete({
					user: "dcrockwell",
					repo: "automationTester"
				}, function (error) {
					if (error) { throw error; }
					deleteRepoDone();
				});
			});
		} else {
			console.log("Creating Repo");
			nockBack("createRepo.json", function (createRepoDone) {
				gitHub.repos.create({
					name: "automationTester",
					description: "This is to test out GitHub API integration.",
					homepage: "https://github.com/FreeAllMedia/automationTester",
					"has_issues": true,
					"has_wiki": false,
					"has_downloads": true,
					"auto_init": false,
					"gitignore_template": "Node",
					private: false
				}, function (error) {
					// if (error) { throw error; }
					createRepoDone();
				});
			});
		}

	});
});
