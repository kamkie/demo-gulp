var gulp = require('gulp');
var concat = require('gulp-concat');
var typescript = require('gulp-tsc');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var run = require('gulp-run');
var del = require('del');

var paths = {
  scripts: ['src/typescript/*.ts'],
  images: 'src/img/**/*'
};

gulp.task('clean', function (cb) {
  del(['build', 'dist'], cb);
});

gulp.task('run', ['scripts'], function () {
  var node = new run.Command('node build/js/app.js');
  node.exec();
})

gulp.task('scripts', [], function () {
  return gulp.src(paths.scripts)
    .pipe(typescript({
      sourceMap: true,
      declaration: true,
      outDir: 'build/sourcemaps/'
    }))
    .pipe(gulp.dest('build/js'));
});

// Copy all static images 
gulp.task('images', [], function () {
  return gulp.src(paths.images)
  // Pass in options to the task 
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('build', ['images'], function () {
  // Minify and copy all JavaScript (except vendor scripts) 
  // with sourcemaps all the way down 
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

gulp.task('default', ['clean', 'scripts', 'images']);