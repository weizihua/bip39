const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
   mode: "production",
   entry: {
      entry: __dirname + '/src/hdwsdk.js'
   },
   output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'hdwsdk.min.js',
   },
   plugins: [
      new UglifyJsPlugin()
   ],
   devtool: "source-map"
}