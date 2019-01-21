const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const presetEnv = require('@babel/preset-env');
const server = require('browser-sync');
const argv = require('yargs').argv;
const gulpIf = require('gulp-if');

const scripts = [
	'./node_modules/picturefill/dist/picturefill.js',
	'./node_modules/svg4everybody/dist/svg4everybody.legacy.js',
	'./app/blocks/**/*.js',
	'./app/scripts/app.js'
];

gulp.task('scripts', () => {
	gulp.src(scripts)
		.pipe(plumber())
		.pipe(babel({
			ignore: ['./node_modules'],
			presets: [presetEnv]}
		))
		.pipe(concat('app.min.js'))
		.pipe(gulpIf(argv.prod, sourcemaps.init()))
		.pipe(gulpIf(argv.prod, uglify()))
		.pipe(gulpIf(argv.prod, sourcemaps.write()))
		.pipe(gulp.dest('dist/assets/scripts'))
		.pipe(server.stream());
});
