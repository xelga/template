const gulp = require('gulp');
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const cheerio = require('gulp-cheerio');
const server = require('browser-sync');

gulp.task('svg-sprite', () => {
	return gulp.src('app/svg-icons/**/*.svg', {base: 'app/svg-icons'})
		.pipe(rename({prefix: 'icon-'}))
		.pipe(svgmin({
			plugins: [{removeViewBox: false}]
		}))
		.pipe(cheerio({
			run: $ => {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
				$('[class]').removeAttr('class');
			},
			parserOptions: {xmlMode: true}
		}))
		.pipe(svgstore())
		.pipe(rename('svg-sprite.svg'))
		.pipe(gulp.dest('dist/assets/svg'))
		.pipe(server.stream());
});
