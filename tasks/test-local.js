import gulp from "gulp";
import mocha from "gulp-mocha";
import istanbul from "gulp-istanbul";
import codeClimate from "./codeClimate";
import paths from "../paths.json";

import chai from "chai";
chai.should(); // This enables should-style syntax

gulp.task("test-local", ["build"], (cb) => {
  gulp.src(paths.build.lib)
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on("finish", () => {
      gulp.src(paths.build.spec)
        .pipe(mocha())
        .pipe(istanbul.writeReports({dir: `${__dirname}/../`, reporters: ["text-summary", "lcovonly"]})) // Creating the reports after tests ran
		//.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } })) // Enforce a coverage of at least 90%
        .on("end", () => {
          //send report to code climate
          codeClimate("e77b8b386ca36e4502126d51be21a8b6f6099b93d6b20388fc85548eb5ac1070", cb);
        });
    });
});
