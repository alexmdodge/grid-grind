let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let StringReplacePlugin = require("string-replace-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

/* Build Variables */
let inProduction = (process.env.NODE.ENV === 'production');

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
        // Template Processing
        test: /\.pug?/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true,
          }
        }
      } , {
        // Font Processing
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      } , {
        // Image Processing
        test: /\.(png|jpg|gif|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            useRelativePath: true
          }
        } 
      } , {
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
              presets: ['env'],
              compact: false,
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
    extensions: ['.js'],

    // Alias for common files
    alias: {
      Services: path.resolve(__dirname, 'app/modules/services/'),
    }
  }
};

if (inProduction) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}