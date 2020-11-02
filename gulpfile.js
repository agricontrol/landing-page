const { src, dest, watch, series, parallel } = require('gulp');
const { execSync } = require('child_process');

const plumber = require('gulp-plumber');
const { server, reload } = require('gulp-connect');
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

const clean = done => {
  execSync('rm -rf public');
  done();
};

const open = done => {
  execSync('open http://localhost:8080');
  done();
};

const serve = done => {
  server({
    livereload: true,
    root: 'public'
  });
  done();
};

const css = () => src('source/css/index.scss', {
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
.pipe(dest('public/css', {
  sourcemaps: '.'
}))
.pipe(reload());

const js = () => src('source/js/index.js', {
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
.pipe(dest('public/js', {
  sourcemaps: '.'
}))
.pipe(reload());

const imgMinimize = () => src([
  'source/img/favicon.png',
  'source/img/logo.svg',
  'source/img/open-graph.jpg',
  'source/img/reto-feissli.jpg',
  'node_modules/feather-icons/dist/feather-sprite.svg'
])
.pipe(plumber())
.pipe(imagemin())
.pipe(dest('public/img'))
.pipe(reload());

const imgOptimize = () => src([
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
.pipe(imagemin())
.pipe(dest('public/img'))
.pipe(webp())
.pipe(dest('public/img'))
.pipe(reload());

const copy = () => src([
  'source/{*,}.*',
  'source/**/*.json'
], {
  base: 'source'
})
.pipe(plumber())
.pipe(dest('public'))
.pipe(reload());

const img = parallel(imgMinimize, imgOptimize);
const build = parallel(copy, js, css, img);

const watchAll = done => {
  watch('source/img/**/*', img);
  watch('source/**/*.scss', css);
  watch('source/**/*.js', js);
  watch([
    'source/{*,}.*',
    'source/**/*.json'
  ], copy);
  done();
};

module.exports = {
  default: series(clean, build, serve, open, watchAll),
  build
};
