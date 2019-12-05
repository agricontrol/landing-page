const gulp = require('gulp');
const open = require('open');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');
const plumber = require('gulp-plumber');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const noop = require('gulp-noop');

const pathsConfig = require('./paths.config');
const webpackConfig = require('./webpack.config');

const prod = process.argv.includes('--prod');


gulp.task('clean', () => del(pathsConfig.dist.root));

gulp.task('browser', () => open('http://localhost:8080'));

gulp.task('serve', done => {
    connect.server({
        port: 8080,
        livereload: true,
        root: pathsConfig.dist.root
    });
    done();
});

gulp.task('css', () => {
    return gulp.src(pathsConfig.src.entry.css, {
            sourcemaps: prod ? false : true
        })
        .pipe(plumber())
        .pipe(sass.sync())
        .pipe(autoprefixer())
        .pipe(prod ? cleanCss() : noop())
        .pipe(gulp.dest(pathsConfig.dist.css, {
            sourcemaps: prod ? false : true
        }))
        .pipe(connect.reload());
});

gulp.task('js', () => {
    return gulp.src(pathsConfig.src.entry.js)
        .pipe(plumber())
        .pipe(named())
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest(pathsConfig.dist.js))
        .pipe(connect.reload());
});

gulp.task('img', () => {
    return gulp.src(pathsConfig.src.img)
        .pipe(plumber())
        .pipe(prod ? imagemin([
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 7
            }),
            imagemin.svgo()
        ], {
            verbose: true
        }) : noop())
        .pipe(gulp.dest(pathsConfig.dist.img))
        .pipe(connect.reload());
});

gulp.task('copy', () => {
    return gulp.src(pathsConfig.src.copy, {
            base: pathsConfig.src.root
        })
        .pipe(plumber())
        .pipe(gulp.dest(pathsConfig.dist.root))
        .pipe(connect.reload());
});


gulp.task('watch:img', done => {
    gulp.watch(pathsConfig.src.img, gulp.parallel('img'));
    done();
});

gulp.task('watch:js', done => {
    gulp.watch(pathsConfig.src.js, gulp.parallel('js'));
    done();
});

gulp.task('watch:css', done => {
    gulp.watch(pathsConfig.src.css, gulp.parallel('css'));
    done();
});

gulp.task('watch:root', done => {
    gulp.watch(pathsConfig.src.copy, gulp.parallel('copy'));
    done();
});


gulp.task('watch', gulp.parallel('watch:img', 'watch:js', 'watch:css', 'watch:root'));
gulp.task('build', gulp.series('clean', gulp.parallel('js', 'css', 'img', 'copy')));
gulp.task('default', gulp.series('build', 'serve', 'browser', 'watch'));
