const webpack = require("webpack");
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const paths = require("./paths");
const helpers = require('./helpers')

let config = {
  entry: [
    helpers.root('/src/main.ts'),
    require.resolve('react-dev-utils/webpackHotDevClient')
  ],
  output: {
    path: helpers.root('/dist'),
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.html', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'tslint-loader'
    },
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'ts-loader']
    },
    {
      test: /\.html$/,
      loader: 'raw-loader',
      exclude: ['./public/index.html']
    }
    ]
  },
  plugins: [
    new NamedModulesPlugin(),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: './assets'
    }]),
    new CaseSensitivePathsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: paths.appSrc,
      tsconfig: paths.appTsConfig,
      tslint: paths.appTsLint,
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}

module.exports = config
