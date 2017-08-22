var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('default', function() {
	gulp.watch('./*.html').on('change', browserSync.reload);
	gulp.watch('./css/*.css').on('change', browserSync.reload);
	gulp.watch('./js/main.js').on('change', browserSync.reload);
	//gulp.watch('./public/js/main.js').on('change', browserSync.reload);

	browserSync.init({
		server: './'
	});
});