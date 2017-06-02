let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let StringReplacePlugin = require("string-replace-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

/* Build Variables */
let inProduction = (process.env.NODE_ENV === 'production');
const PHASER_DIR = path.join(__dirname, '/node_modules/phaser/');

/* Main Webpack File */
module.exports = {
  entry: {
    vendor: ['jquery'],
    app: [
      path.resolve(__dirname, 'app/modules/app.js'),
      path.resolve(__dirname, 'app/styles/styles.scss'),
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'gridgrind.[name].js'
  },

  module: {
    rules: [
      {
        test: /pixi\.js$/,
        use: [{
          loader: 'expose-loader',
          options: 'PIXI',
        }],
      }, {
        test: /phaser-split\.js$/,
        use: [{
          loader: 'expose-loader',
          options: 'Phaser',
        }],
      }, {
        test: /p2\.js$/,
        use: [{
          loader: 'expose-loader',
          options: 'p2',
        }],
      }, {
        // Template Processing
        test: /\.pug?/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true,
          }
        }
      }, {
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
              presets: ['env', 'react', 'stage-1'],
              compact: false,
            }
          } , {
            loader: 'eslint-loader',
          }
        ]
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
    new HtmlWebpackPlugin({
      title: 'GridGrind | The Random Puzzle Game',
      inject: false,
      hash: true,
      template: path.resolve(__dirname, 'app/index.pug'),
    })
  ],

  resolve: {
    // directories where to look for modules
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ],

    // Extensions that are used
    extensions: ['.js', '.jsx'],

    // Alias for common files
    alias: {
      phaser: path.join(PHASER_DIR, 'build/custom/phaser-split.js'),
      pixi: path.join(PHASER_DIR, 'build/custom/pixi.js'),
      p2: path.join(PHASER_DIR, 'build/custom/p2.js'),
      Services: path.resolve(__dirname, 'app/modules/services/'),
    }
  }
};

if (inProduction) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}