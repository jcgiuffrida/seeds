const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    'js/app': './js/home/app.js',
    'js/vendor': './js/vendor/index.js' // third party scripts, css entry, images
  },
  devtool: 'source-map',
  devServer: {
    port: 3050,
    proxy: {
      '/': 'http://127.0.0.1:5000'
    },
    publicPath: '/static/'
  },
  stats: {
    // make webpack a little less noisy
    assets: false,
    chunks: false,
    modules: false,
    children: false,
    hash: false,
    timings: false,
    version: false
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader' // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function() {
                // post css plugins, can be exported to postcss.config.js
                return [require('precss'), require('autoprefixer')]
              }
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(woff2?|jpe?g|png|gif|ico)$/,
        use: 'file-loader?name=./img/[name].[ext]'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['static/']),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: ['popper.js', 'default'] // Used for Bootstrap dropdown, popup and tooltip JavaScript components
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './static/'),
    sourceMapFilename: '[file].map'
  }
}
