/* global require __dirname module */
let path = require('path');

let conf = {
    entry: './es6/lesson6-axios/index.js',
    //entry: './es6/lesson5-hw-basis/index.js',
    output: {
        path: path.resolve(__dirname, './js'),
        filename: 'main.js',
        publicPath: 'js/'
    },
    devServer: {
        overlay: true,
        proxy: {
            '/js-6-api/**': {
                target: 'http://localhost/',
                secure: false,
                changeOrigin: true
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: '/node_modules/'
            }
        ]
    }
};

module.exports = (env, options) => {
    conf.devtool = options.mode === "production" ? 
                    false :
                    "cheap-module-eval-source-map";

    return conf;
};