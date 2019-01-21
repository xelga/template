const gulp = require('gulp');
const pug = require('gulp-pug');
const pugLinter = require('gulp-pug-linter');
const argv = require('yargs').argv;
const gulpIf = require('gulp-if');
const prettify = require('gulp-jsbeautifier');
const server = require('browser-sync');

gulp.task('templates', () => {
	gulp.src('app/pages/*.pug')
		.pipe(pug())
		.pipe(gulpIf(!argv.prod, prettify({
			brace_style: 'expand',
			indent_with_tabs: true,
			end_with_newline: true,
			unformatted: ['use']
		})))
		.pipe(gulp.dest('dist'))
		.pipe(server.stream());
});

gulp.task('templates:lint', () => {
	gulp.src('app/**/*.pug')
		.pipe(pugLinter({reporter: 'default'}));
});
