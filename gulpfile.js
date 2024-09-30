const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
// const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const babel = require("gulp-babel");

// compile scss to css
gulp.task("sass", () =>
	gulp
		.src("./sass/styles.scss")
		.pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
		.pipe(rename({ basename: "styles.min" }))
		.pipe(gulp.dest("./css")),
);

// watch changes in scss files and run sass task
gulp.task("sass:watch", () => {
	gulp.watch("./sass/**/*.scss", ["sass"]);
});

gulp.task("minify-js", () => {
	return gulp
		.src("./js/scripts.js")
		.pipe(babel({ presets: ["minify"] }))
		.pipe(rename({ basename: "scripts.min" }))
		.pipe(gulp.dest("./js"));
});

// default task
gulp.task("default", gulp.series("sass", "minify-js"));
