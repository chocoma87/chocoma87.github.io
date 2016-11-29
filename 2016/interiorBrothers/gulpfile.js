


var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var include = require('gulp-file-include');
var concatCss = require('gulp-concat');
var gutill = require('gulp-util');
var ftp = require('vinyl-ftp');

/*
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulpUtil = require('gulp-util');*/



// ftp로 업로드 한다
gulp.task('upload', function(){

    var conn = ftp.create({
        host: 'spaaaade.com',
        user: 'spcoding',
        password: 'Spa39030!!',
        parallel: 10,
        log: gutill.log
    });

    var globs = [
        'dist/css/**',
        'dist/js/**',
        'dist/*.html',
        'dist/images/**'
    ];

    return gulp.src(globs, {base: 'dist/', buffer: false})
        .pipe(conn.newer('/www/project/2016/interiorBrothers/project'))
        .pipe(conn.dest('/www/project/2016/interiorBrothers/project'));
});



// sass 로 만든 모든 파일 style.css 로 변환 후 dist 로 복사
gulp.task('sass', function(){
    return gulp.src(['app/css/!(mediaQuery)*.scss', 'app/css/mediaQuery.scss'])
        .pipe(concatCss('style.scss'))
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
});

// js 파일 dist 폴더로 복사
gulp.task('js', function(){
    return gulp.src('app/js/*.js')
        .pipe(gulp.dest('dist/js'))
});

// header, footer, include 를 html 파일에 삽입한다
gulp.task('fileinclude', function(){
    gulp.src('app/*.html')
        .pipe(include())
        .pipe(gulp.dest('dist'))
});



gulp.task('watch', function(){
    gulp.watch('app/css/*.scss', ['sass']);
    gulp.watch('app/include/*.html', ['fileinclude'])
    gulp.watch('app/*.html', ['fileinclude'])
    gulp.watch('app/js/*.js', ['js'])
});




