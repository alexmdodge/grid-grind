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
      './app/styles/styles.scss',
      './app/index.html',
    ],
    vendor: ['jquery']
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'gridgrind.[name].js',
  },

  module: {
    rules: [
      {
        // Markup Processing
        test: /\.html$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].html'
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
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
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
    new StringReplacePlugin(),
  ]
};

if (inProduction) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}