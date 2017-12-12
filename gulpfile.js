var gulp = require('gulp');
var util = require('gulp-util');
gulp.task('serveprod', function() {
  console.log('moving files');
   return gulp.src(['dist/*.*']).pipe(gulp.dest('dist/'));
});