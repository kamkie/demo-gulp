var gulp = require('gulp');
var concat = require('gulp-concat');
var typescript = require('gulp-tsc');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var run = require('gulp-run');
var tsd = require('gulp-tsd');
var del = require('del');

var paths = {
    scripts: ['src/typescript/*.ts'],
    images: 'src/img/**/*'
};

gulp.task('clean', function (cb) {
    del(['build', 'dist', 'typings'], cb);
});

gulp.task('run', ['tsd', 'scripts'], function () {
    var node = new run.Command('node build/js/app.js');
    node.exec();
});

gulp.task('tsd', function (callback) {
    tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, callback);
});

gulp.task('scripts', ['tsd'], function () {
    return gulp.src(paths.scripts)
        .pipe(typescript({
            sourceMap: true,
            declaration: true,
            outDir: 'build/sourcemaps/'
        }))
        .pipe(gulp.dest('build/js'));
});

gulp.task('images', [], function () {
    // Copy all static images
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('build/img'));
});

gulp.task('build', ['tsd', 'images'], function () {
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(paths.scripts)
        .pipe(typescript())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['scripts', 'images']);