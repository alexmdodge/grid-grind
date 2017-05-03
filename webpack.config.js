let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let StringReplacePlugin = require("string-replace-webpack-plugin");

/* Build Variables */
let inProduction = (process.env.NODE.ENV === 'production');

/* Main Webpack File */
module.exports = {
  entry: {
    app: [
      './app/js/game.js',
      './app/styles/styles.scss'
    ],
    vendor: ['jquery', 'phaser']
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'gg-[name].[chunkhash].js',
  },

  module: {
    rules: [
      {
        // Stylesheets Processing
        test: /\.s[ac]ss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      } , {
        // Javascript Processing
        test: /\.js$/,
        exclude: /(node_modules|bower_components|dist)$/,
        use: [
          {
            loader: 'babel-loader',
            options: { 
              presets: ['env']
            }
          } , {
            loader: 'eslint-loader',
          }
        ]
      } , {
        // Image processing
        test: /\.(png|svg|jpg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }],
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.LoaderOptionsPlugin({
      minimize: inProduction,
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    }),
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false,
    }),
    new StringReplacePlugin(),
  ]
};

if (inProduction) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}