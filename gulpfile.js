const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
    return gulp.src('server/routes/es6/list.js')
        .pipe(babel({
            presets: ['es2015'],
            plugins: ["syntax-async-functions", "transform-regenerator"]
        }))
        .pipe(gulp.dest('server/routes'));
});