const gulp = require('gulp');
const runSequence = require('run-sequence');
const server = require('browser-sync');
const requireDir = require('require-dir');

requireDir('./gulp-tasks');
server.create();

gulp.task('build', callback => {
	runSequence('png-sprites', 'svg-sprite', 'templates', 'styles', 'scripts', 'images', 'copy', callback);
});

gulp.task('serve', ['png-sprites', 'svg-sprite', 'templates', 'styles', 'scripts', 'images', 'copy'], () => {
	server.init({
		server: 'dist'
	});

	gulp.watch('app/png-sprites/*.png', ['png-sprites', 'images']);
	gulp.watch('app/svg-icons/*.svg', ['svg-sprite']);
	gulp.watch('app/**/*.pug', ['templates']);
	gulp.watch('app/{styles,blocks}/**/*.{scss,sass}', ['styles']);
	gulp.watch('app/scripts/**/*.js', ['scripts']);
	gulp.watch('app/images/**/*.{jpg,png,svg,webp}', ['images']);
	gulp.watch('app/resources/**/*', ['copy']);
});
