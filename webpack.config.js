'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = { 
    entry: {
        main: './src/app.js'
    },
    output: {
        path: './public',
        filename: '[name].bundle.js'
    },

    module: {
        noParse: [
            /sinon\.js/
        ], 

        loaders: [
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            }, 
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: { 
                    presets: ['babel-preset-latest', 'babel-polyfill'] 
                },
            },
            { 
                test: /\.(css|styl)/, 
                loader: ExtractTextPlugin.extract('css!stylus') 
            },
        ]
    },

    devServer: {
        host: 'localhost',
        port: 8080
    },

    devtool: 'source-map',

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.pug'
        }),
        new ExtractTextPlugin('index.css', { allChunks: true })
    ]
};