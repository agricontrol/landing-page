const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const prod = process.argv.includes('--prod');

module.exports = {
    output: {
        filename: '[name].js'
    },
    devtool: prod ? false : 'source-map',
    mode: prod ? 'production' : 'development',
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                'babel-loader',
                'eslint-loader'
            ],
            exclude: /node_modules/
        }, {
            test: /\.hbs$/,
            use: 'handlebars-loader'
        }]
    },
    ...(prod && {
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false
                        }
                    }
                })
            ]
        }
    })
};
