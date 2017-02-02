var path = require('path');

var webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src/js/index.js'),
    output: {
        path: path.resolve(__dirname, 'build/js'),
        filename: 'index.js',
    },
    devtool: 'eval',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
        },
      ]
    }
};
