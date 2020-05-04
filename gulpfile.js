const gulp = require('gulp');
const open = require('open');
const del = require('del');
const plumber = require('gulp-plumber');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const rezzy = require('gulp-rezzy');
const webp = require('gulp-webp');
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const cssnano = require('cssnano');
const cssEnv = require('postcss-preset-env');
const reporter = require('postcss-reporter');
const { rollup } = require('rollup');
const buble = require('@rollup/plugin-buble');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
const { eslint } = require('rollup-plugin-eslint');

const development = process.argv.includes('--dev');


gulp.task('clean', () => del('dist'));
gulp.task('open:browser', () => open('http://localhost:8080'));
gulp.task('open:dist', () => open('dist'));

gulp.task('serve', done => {
  connect.server({
    port: 8080,
    livereload: true,
    root: 'dist'
  });
  done();
});

gulp.task('css', () => gulp.src('src/css/*', {
    sourcemaps: development
  })
  .pipe(plumber())
  .pipe(postcss([
    stylelint(),
    reporter({
      clearReportedMessages: true
    })
  ]))
  .pipe(sass.sync())
  .pipe(postcss([
    cssEnv(),
    !development && autoprefixer(),
    !development && cssnano()
  ].filter(p => p)))
  .pipe(gulp.dest('dist/css', {
    sourcemaps: '.'
  }))
  .pipe(connect.reload()));

gulp.task('js', async () => {
  const bundle = await rollup({
    input: 'src/js/main.js',
    plugins: [
      eslint(),
      resolve(),
      commonjs(),
      !development && buble(),
      !development && terser({
        output: {
          comments: false
        }
      })
    ].filter(p => p)
  });

  await bundle.write({
    sourcemap: development,
    file: 'dist/js/bundle.js',
    format: 'iife'
  });
});

gulp.task('img:minimize', () => gulp.src([
    'src/img/favicon.png',
    'src/img/logo.svg',
    'src/img/open-graph.jpg',
    'node_modules/feather-icons/dist/feather-sprite.svg'
  ])
  .pipe(plumber())
  .pipe(imagemin({
    verbose: development
  }))
  .pipe(gulp.dest('dist/img'))
  .pipe(connect.reload()));

gulp.task('img:optimize', () => gulp.src([
    'src/img/about.jpg',
    'src/img/funktionsweise.jpg',
    'src/img/header.jpg',
    'src/img/vorteil.jpg'
  ])
  .pipe(plumber())
  .pipe(rezzy([{
    width: 1920,
    height: 1440,
    suffix: '-1920w'
  }, {
    width: 1280,
    height: 960,
    suffix: '-1280w'
  }, {
    width: 640,
    height: 480,
    suffix: '-640w'
  }]))
  .pipe(imagemin({
    verbose: development
  }))
  .pipe(gulp.dest('dist/img'))
  .pipe(webp())
  .pipe(gulp.dest('dist/img'))
  .pipe(connect.reload()));

gulp.task('copy', () => gulp.src([ 'src/{*,}.*', 'src/data/*' ], {
    base: 'src'
  })
  .pipe(plumber())
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload()));


gulp.task('watch:img', done => {
  gulp.watch('src/img/*', gulp.parallel('img:minimize', 'img:optimize'));
  done();
});

gulp.task('watch:js', done => {
  gulp.watch('src/js/*', gulp.parallel('js'));
  done();
});

gulp.task('watch:css', done => {
  gulp.watch('src/css/*', gulp.parallel('css'));
  done();
});

gulp.task('watch:root', done => {
  gulp.watch([ 'src/{*,}.*', 'src/data/*' ], gulp.parallel('copy'));
  done();
});


gulp.task('watch', gulp.parallel('watch:img', 'watch:js', 'watch:css', 'watch:root'));
gulp.task('build', gulp.series('clean', gulp.parallel('js', 'css', 'img:minimize', 'img:optimize', 'copy')));
gulp.task('dist', gulp.series('build', 'open:dist'));
gulp.task('default', gulp.series('build', 'serve', 'open:browser', 'watch'));
