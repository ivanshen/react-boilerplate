var gulp = require('gulp');
var webpack = require('webpack');
var gutil = require('gulp-util');
var config = require('../webpack.config.js');
gulp.task('build', function(done){
   webpack(config).run(onBuild(done));
});

function onBuild(done) {
    return function(err, stats) {
        if (err) {
            gutil.log('Error', err);
            if (done) {
                done();
            }
        } else {
            Object.keys(stats.compilation.assets).forEach(function(key) {
                gutil.log('Webpack: output ', gutil.colors.green(key));
            });
            gutil.log('Webpack: ', gutil.colors.blue('finished ', stats.compilation.name));
            if (done) {
                done();
            }
        }
    }
}