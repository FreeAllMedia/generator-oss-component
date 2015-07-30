import gulp from "gulp";
import paths from "../paths.json";

gulp.task("watch", () => {
  gulp.watch([paths.source.lib, paths.source.spec], ["test"]);
});
