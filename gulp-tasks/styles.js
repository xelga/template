const gulp = require('gulp');
const sass = require('gulp-sass');
const stylint = require('gulp-stylelint');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minify = require('gulp-csso');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const cssGlobbing = require('gulp-css-globbing');
const server = require('browser-sync');
const argv = require('yargs').argv;
const gulpIf = require('gulp-if');

gulp.task('styles', () => {
	gulp.src('app/styles/app.scss')
		.pipe(plumber())
		.pipe(cssGlobbing({
			extensions: ['.css', '.scss']
		}))
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded',
			includePaths: require('node-normalize-scss').includePaths
		}))
		.pipe(postcss([
			autoprefixer()
		]))
		.pipe(gulpIf(argv.prod, minify()))
		.pipe(sourcemaps.write())
		.pipe(rename('app.min.css'))
		.pipe(gulp.dest('dist/assets/styles'))
		.pipe(server.stream());
});

gulp.task('styles:lint', () => {
	gulp.src('app/**/*.scss')
		.pipe(stylint({
			reporters: [
				{formatter: 'string', console: true}
			]
		}));
});
