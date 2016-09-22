


var gulp = require('gulp');
var concatCss = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulpUtil = require('gulp-util');



// concat 파일
var cssDest = 'markany/css';

gulp.task('default', function(){
    return gulp.src(['markany/asset/*.css', 'markany/asset/last/*.css'])
        // 결과물 파일 이름
        .pipe(concatCss('style.css'))
        .pipe(gulp.dest(cssDest))
});

gulp.watch('markany/asset/**/*.css', ['default']);



// sass
var sass = require('gulp-sass');

gulp.task('sass', function(){
    gulp.src('sass/style.scss')
        // 결과물 파일 이름
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

gulp.watch('sass/*.scss', ['sass']);



