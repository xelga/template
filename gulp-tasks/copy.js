const gulp = require('gulp');

gulp.task('copy', () => {
	gulp.src('app/resources/**/*')
		.pipe(gulp.dest('dist'));
});
