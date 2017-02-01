'use strict';

//extractTextPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: {
        main: './app.js'
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
            loader: 'pug'
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel?presets[]=es2015'
        }]
    },

    devServer: {
        host: 'localhost',
        port: 8080
    },

    devtool: 'source-map',

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.pug'
        })
    ]
};