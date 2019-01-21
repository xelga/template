const gulp = require('gulp');
const spritesmith = require('gulp.spritesmith');

gulp.task('png-sprites', () => {
	const spriteData = gulp.src('app/png-icons/*.png')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: '_png-sprites.scss',
			padding: 10,
			imgPath: '../images/sprites/sprite.png',
			retinaSrcFilter: ['app/png-icons/*@2x.png'],
			retinaImgName: 'sprite@2x.png',
			retinaImgPath: '../images/sprites/sprite@2x.png'
		}));
	spriteData.img.pipe(gulp.dest('dist/assets/images/sprites/'));
	spriteData.css.pipe(gulp.dest('app/styles/'));
});
