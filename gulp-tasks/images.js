const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const server = require('browser-sync');

gulp.task('images', () => {
	gulp.src('app/images/**/*.{png,jpg,svg,webp}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true}),
			imagemin.svgo()
		]))
		.pipe(gulp.dest('dist/assets/images'))
		.pipe(server.stream());
});
