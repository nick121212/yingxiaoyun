const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

const env = require('../environment/dev.env');
const helpers = require('./helpers');
const webpackConfig = require('./webpack.config.base');

webpackConfig.module.rules = [...webpackConfig.module.rules,
{
  test: /\.scss$/,
  use: [{
    loader: 'style-loader'
  }, {
    loader: 'css-loader'
  }, {
    loader: 'sass-loader'
  }]
}, {
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}, {
  test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
  loader: 'file-loader'
}]

webpackConfig.plugins = [...webpackConfig.plugins,
new HtmlWebpackPlugin({
  inject: true,
  template: helpers.root('/public/index.html')
}),
new DefinePlugin({
  'process.env': env
})
]

webpackConfig.devServer = {
  port: 8080,
  host: 'localhost',
  historyApiFallback: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  hot: true,
  contentBase: './src',
  open: true,
  quiet: false,
  proxy: {
    "/tvmaze/*": {
      target: "http://api.tvmaze.com/",
      pathRewrite: { '^/tvmaze': '' },
      changeOrigin: true,
      secure: false
    }
  },
  overlay: false,
  before(app) {
    app.use(errorOverlayMiddleware());
  }
}

module.exports = webpackConfig;
