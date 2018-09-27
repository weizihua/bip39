const ip = require('ip');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: {
    main: './src/main.js',
    hdwsdk: './lib/hdwsdk.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './',
    // filename: 'hdwsdk.[name].js',
    // filename: "[name].[hash:8].js",
    filename: "[name].min.js",
    // chunkFilename: "[name].chunk.js"
    // chunkFilename: "[name].[hash:8].chunk.js"
  },
  plugins: [
    new HtmlWebpackPlugin({  
      file: 'index.html', 
      template: './src/index.html',
      minify: {
        // collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
      }, 
      hash: true, //为了更好的 cache，可以在文件名后加个 hash。
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  

  performance: { 
    hints: process.env.NODE_ENV !== 'production' ? "warning" : false 
  },
  // devtool:'eval-source-map',
  resolve: {
    extensions: [".js",".css",".json"],
  },
  devServer: {
    open: true,
    host: ip.address(),
    port: 8080,
    compress:true,
    hot: true,
    // openPage: '/',
    index: 'index.html',

  },
}

if (process.env.NODE_ENV === 'production') {
  // module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin(['dist']),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
  module.exports.optimization = {
    splitChunks: {
      chunks: 'async',//默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      // minSize: 30000,//合并前模块文件的体积
      // minChunks: 1,//最少被引用次数
      // maxAsyncRequests: 5,
      // maxInitialRequests: 4,
      // automaticNameDelimiter: '.',//自动命名连接符
      // cacheGroups: {
      //   default: {
      //     test: /[\\/]src[\\/]js[\\/]/,
      //     minChunks: 2,//一般为非第三方公共模块
      //     priority: -20,
      //     reuseExistingChunk: true,
      //     name: "default",
      //   },
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     minChunks:1,//敲黑板
      //     priority: -10,//优先级更高
      //     name: "vendors",
      //   },

      // },
    },
    // runtimeChunk:{
    //   name:'bip39'
    // },
    // runtimeChunk: 'single',
    minimizer: [
      // 自定义js优化配置，将会覆盖默认配置
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        // exclude: /\.min\.js$/,
        cache: true,
        parallel: true, // 开启并行压缩，充分利用cpu
        sourceMap: false,
        extractComments: false, // 移除注释
        uglifyOptions: {
          compress: {
            unused: true,
            warnings: false,
            drop_debugger: true,
            drop_console: true,
          },
          output: {
            comments: false
          }
        }
      }),
    ],
  }

  if(process.env.npm_config_report){
    module.exports.plugins = (module.exports.plugins || []).concat([ 
      new BundleAnalyzerPlugin(),
    ])
  }
}
