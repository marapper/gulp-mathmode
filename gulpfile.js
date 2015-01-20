var gulp   = require('gulp');

var format = 'png';

var sources = ['index.js'];
var testSources = ['test/**/*.js'];
var allSources = sources.concat(testSources);

var buildPath = 'test/build';

gulp.task('jshint', function() {
    var jshint = require('gulp-jshint');
    var jshintStylish = require('jshint-stylish');

    gulp.src(allSources)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
});

gulp.task('jscs', function () {
    var jscs = require('gulp-jscs');
    gulp.src(allSources)
        .pipe(jscs());
});

gulp.task('clean', function () {
    var clean = require('gulp-clean');
    return gulp.src(buildPath + '/*.png', {read: false})
        .pipe(clean());
});

gulp.task('test1', ['clean'], function () {
    var math = require('./'),
        rename = require("gulp-rename");
    gulp.src('test/**/*.tex')
        .pipe(math({
            format: format,
            dpi: 300
        }))
        .pipe(rename({extname: '.' + format}))
        .pipe(gulp.dest(buildPath));
});


gulp.task( 'default', [ 'clean', 'jshint', 'jscs', 'watch' ] );

// Gulp Watch
gulp.task( 'watch', function(){
    gulp.watch( allSources, ['default'] );
});
