var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var env = require('../config/env.json');

// Static Server + watching scss/html files

gulp.task('serve', ['sass', 'nodemon'], function() {
	browserSync.init({
		injectChanges: true,
        proxy: `localhost:${env.port}`,
        port: 8080
    });
    gulp.watch("src/client/scss/*.scss", ['sass']);
    gulp.watch("src/client/**/*.js").on('change', function() {
    	gulp.start('build');
    });
    gulp.watch("public/bundles/*.js").on('change', browserSync.reload);
})

gulp.task('nodemon', function() {
    nodemon({
        script: './src/server/app.js',
        watch: ["./src/server/"],
        ext: 'js'
    })
})

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/client/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});
gulp.task('default', ['serve']);