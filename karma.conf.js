const webpackConfig = require('./webpack.config.js');

module.exports = function (config) {

    config.set({

        basePath: './src/__tests__/',

        browsers: ['PhantomJS'],

        frameworks: ['mocha', 'sinon', 'chai'],

        files: [ 
            '*Test.js'
        ],

        reporters: ['mocha'],

        preprocessors: {
            '*.js': ['webpack']
        },

        webpack: webpackConfig,

        plugins: [
            require('karma-webpack'),
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-sinon'),
            require('karma-sinon-chai'),
            require('karma-mocha-reporter'),
            require('karma-phantomjs-launcher')
        ]
    });
};