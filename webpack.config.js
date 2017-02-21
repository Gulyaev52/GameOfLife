'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pageList = [
  'index'
];

const entries = {};
pageList.forEach(page => { 
  entries[page] = ['babel-polyfill', `./src/pages/${page}/${page}.js`]; 
});

const htmlPlugins = [];

pageList.forEach(page => {
  htmlPlugins.push(new HtmlWebpackPlugin({
    template: `src/pages/${page}/${page}.pug`,
    filename: `${page}.html`,
    chunks: [page]
  }));
});

module.exports = { 
    entry: entries,

    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].bundle.js',
    },  

    eslint: {
        configFile: './.eslintrc.yml'
    },

    module: {
        noParse: [
            /sinon\.js/
        ], 

        preLoaders: [
            {
                test: /\.js$/, 
                loader: "eslint-loader", 
                include: [ 
                    path.resolve(__dirname, 'src'),  
                ]
            }
        ],  

        loaders: [
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            }, 
            {
                test: /\.js$/,
                loader: 'babel',
                include: [ 
                    path.resolve(__dirname, 'src')
                ],
                query: { 
                    presets: ['babel-preset-latest'] 
                },
            },
            { 
                test: /\.(css|styl)/, 
                loader: ExtractTextPlugin.extract('css!stylus') 
            },
        ]
    },

    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js', '.styl', '.pug']
    },

    devServer: {
        host: 'localhost',
        port: 8080
    },

    devtool: 'source-map',

    plugins: [ 
        new ExtractTextPlugin('[name].css', { allChunks: true }),
        ...htmlPlugins
    ]
};