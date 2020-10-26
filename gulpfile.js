const gulp = require('gulp');
const { execSync } = require('child_process');

const plumber = require('gulp-plumber');
const connect = require('gulp-connect');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const rezzy = require('gulp-rezzy');
const webp = require('gulp-webp');
const rename = require('gulp-rename');
const sass = require('@rbnlffl/gulp-sass');
const rollup = require('@rbnlffl/gulp-rollup');

const stylelint = require('stylelint');
const cssnano = require('cssnano');
const cssEnv = require('postcss-preset-env');
const reporter = require('postcss-reporter');
const scssParser = require('postcss-scss');

const buble = require('@rollup/plugin-buble');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const eslint = require('@rbnlffl/rollup-plugin-eslint');

const development = process.argv.includes('--dev');

gulp.task('clean', done => {
  execSync('rm -rf public');
  done();
});

gulp.task('open:browser', done => {
  execSync('open http://localhost:8080');
  done();
});

gulp.task('serve', done => {
  connect.server({
    livereload: true,
    root: 'public'
  });
  done();
});

gulp.task('css', () => gulp.src('source/css/index.scss', {
    sourcemaps: development
  })
  .pipe(plumber())
  .pipe(postcss([
    stylelint(),
    reporter({
      clearReportedMessages: true
    })
  ], {
    parser: scssParser
  }))
  .pipe(sass())
  .pipe(postcss([
    cssEnv(),
    !development && cssnano()
  ].filter(plugin => plugin)))
  .pipe(rename('agricontrol.css'))
  .pipe(gulp.dest('public/css', {
    sourcemaps: '.'
  }))
  .pipe(connect.reload()));

gulp.task('js', () => gulp.src('source/js/index.js', {
    sourcemaps: development
  })
  .pipe(plumber())
  .pipe(rollup({
    plugins: [
      eslint(),
      nodeResolve(),
      commonjs(),
      !development && buble(),
      !development && terser({
        format: {
          comments: false
        }
      })
    ].filter(plugin => plugin)
  }, {
    format: 'iife'
  }))
  .pipe(rename('agricontrol.js'))
  .pipe(gulp.dest('public/js', {
    sourcemaps: '.'
  }))
  .pipe(connect.reload()));

gulp.task('img:minimize', () => gulp.src([
    'source/img/favicon.png',
    'source/img/logo.svg',
    'source/img/open-graph.jpg',
    'source/img/reto-feissli.jpg',
    'node_modules/feather-icons/dist/feather-sprite.svg'
  ])
  .pipe(plumber())
  .pipe(imagemin({
    verbose: development
  }))
  .pipe(gulp.dest('public/img'))
  .pipe(connect.reload()));

gulp.task('img:optimize', () => gulp.src([
    'source/img/about.jpg',
    'source/img/funktionsweise.jpg',
    'source/img/header.jpg',
    'source/img/vorteil.jpg',
    'source/img/faqs.jpg'
  ])
  .pipe(plumber())
  .pipe(rezzy([{
    width: 1920,
    height: 1200,
    suffix: '-1920w'
  }, {
    width: 1280,
    height: 800,
    suffix: '-1280w'
  }, {
    width: 640,
    height: 400,
    suffix: '-640w'
  }]))
  .pipe(imagemin({
    verbose: development
  }))
  .pipe(gulp.dest('public/img'))
  .pipe(webp())
  .pipe(gulp.dest('public/img'))
  .pipe(connect.reload()));

gulp.task('copy', () => gulp.src([ 'source/{*,}.*', 'source/data/*' ], {
    base: 'source'
  })
  .pipe(plumber())
  .pipe(gulp.dest('public'))
  .pipe(connect.reload()));


gulp.task('watch:img', done => {
  gulp.watch('source/img/*', gulp.parallel('img:minimize', 'img:optimize'));
  done();
});

gulp.task('watch:js', done => {
  gulp.watch('source/js/*', gulp.parallel('js'));
  done();
});

gulp.task('watch:css', done => {
  gulp.watch('source/css/*', gulp.parallel('css'));
  done();
});

gulp.task('watch:root', done => {
  gulp.watch([ 'source/{*,}.*', 'source/data/*' ], gulp.parallel('copy'));
  done();
});


gulp.task('watch', gulp.parallel('watch:img', 'watch:js', 'watch:css', 'watch:root'));
gulp.task('img', gulp.parallel('img:minimize', 'img:optimize'));
gulp.task('build', gulp.series('clean', gulp.parallel('js', 'css', 'img', 'copy')));
gulp.task('default', gulp.series('build', 'serve', 'open:browser', 'watch'));
