import gulp from "gulp";
import paths from "../paths.json";

gulp.task("test", ["test-local"]);
gulp.task("watch-test", () => {
	return gulp.watch([paths.source.lib, paths.source.spec], ["test"]);
});
