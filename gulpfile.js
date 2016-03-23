var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babel = require('babelify');

gulp.task('javascript', function() {
  var b = browserify('./gh-pages-src/js/main.js').transform(babel, {presets: ["es2015", "react", "stage-2"]});

  return b.bundle()
          .pipe(source('main.js'))
          .pipe(gulp.dest('./'));
});

gulp.task('watch', ['javascript'], function () {
  gulp.watch('./gh-pages-src/js/*.js', ['javascript']);
});

gulp.task('default', ['watch']);
