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
    app: [
      path.resolve(__dirname, 'app/js/game.js'),
      path.resolve(__dirname, 'app/styles/styles.scss'),
    ],
    vendor: ['jquery']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'gridgrind.[name].js',
  },

  module: {
    rules: [
      {
        // Template Processing
        test: /\.pug?/,
        loader: 'pug-loader'
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
    new HtmlWebpackPlugin({
      title: 'GridGrind | The Random Puzzle Game',
      template: 'index.pug'
    })
  ],

  resolve: {
    // directories where to look for modules
    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],

    // Extensions that are used
    extensions: [".js", ".json", ".css", ".scss"],

    // These can be referenced when including and requiring files
    alias: {
      Components: path.resolve(__dirname, 'app/modules/components/'),
      Services: path.resolve(__dirname, 'app/modules/services/'),
      Fonts: path.resolve(__dirname, 'app/fonts/'),
      Images: path.resolve(__dirname, 'app/images/'),
      Styles: path.resolve(__dirname, 'app/styles/'),
    },
  }
};

if (inProduction) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}