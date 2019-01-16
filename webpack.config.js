const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const prod = process.argv.includes('--prod');

let config = {
    output: {
        filename: '[name].js'
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [{
            test: /\.js$/,
            use: [ 'eslint-loader', 'babel-loader' ],
            exclude: /node_modules/
        }]
    },
};

if (prod) {
    config = merge(config, {
        devtool: false,
        mode: 'production',
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
    });
}

module.exports = config;
