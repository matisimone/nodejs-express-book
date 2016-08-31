var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint');

gulp.task('default', function() {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT:8000
        },
        ignore: ['./node_modules/**']
    })
    .on(restart, function() {
        console.log('Restarting');
    });
});

gulp.task('lint', function() {
  gulp.src(['./lib/*.js', './public/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});