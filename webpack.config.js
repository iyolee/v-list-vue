/* global __dirname, require, module */

const LIB_NAME = 'vList';

const path = require('path');
const env = require('yargs').argv.env;
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const outputFile = LIB_NAME + (env === 'build' ? '.min.js' : '.js');

const optimization = {};
if (env === 'build') {
  optimization.optimization = {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      })
    ]
  };
}

const config = {
  mode: env === 'build' ? 'production' : 'development',
  entry: [path.resolve(__dirname, 'src/index.js')],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile,
    library: LIB_NAME,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  stats: {
    warnings: false,
    modules: false,
    hash: false
  },
  externals: {
    vue: 'vue'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
        loader: 'url-loader',
        query: {
          limit: 30000
        }
      }
    ]
  },
  // resolve: {
  //   modules: [path.resolve('./node_modules'), path.resolve('./src')],
  //   extensions: ['.js']
  // },
  plugins: [
    new VueLoaderPlugin()
  ],
  ...optimization
};

module.exports = config;