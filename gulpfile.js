var gulp = require('gulp');
var concat = require('gulp-concat');
var typescript = require('gulp-tsc');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var run = require('gulp-run');
var del = require('del');

var paths = {
  scripts: ['src/typescript/*.ts'],
  images: 'src/img/**/*'
};

gulp.task('clean', function (cb) {
  // You can use multiple globbing patterns as you would with `gulp.src` 
  del(['build'], cb);
});

gulp.task('run', function () {
  var node = new run.Command('node build/js/all.min.js');
  node.exec();
})

gulp.task('scripts', [], function () {
  // Minify and copy all JavaScript (except vendor scripts) 
  // with sourcemaps all the way down 
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(typescript({
      sourceMap: true,
      declaration: true,
      outDir: 'build/sourcemaps/'
    }))
  // .pipe(uglify())
  // .pipe(concat('all.min.js'))
  // .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

// Copy all static images 
gulp.task('images', [], function () {
  return gulp.src(paths.images)
  // Pass in options to the task 
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['clean', 'scripts', 'images']);