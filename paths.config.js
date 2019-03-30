module.exports = {
    dist: {
        root: 'dist',
        css: 'dist/css',
        js: 'dist/js',
        img: 'dist/img'
    },
    src: {
        root: 'src',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.scss',
        img: [
            'src/img/**/*',
            'node_modules/feather-icons/dist/feather-sprite.svg'
        ],
        copy: 'src/{*,}.*',
        entry: {
            js: 'src/js/main.js',
            css: 'src/css/main.scss'
        }
    }
};
