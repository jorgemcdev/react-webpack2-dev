const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app/index.js',
    contact: './src/app/contact.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      }
    ]
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    stats: 'errors-only',
    historyApiFallback: true,
    open: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Project',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      excludeChunks: ['contact'],
      template: './src/templates/index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Contact',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      chunks: ['contact'],
      filename: 'contact.html',
      template: './src/templates/contact.html'
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: true,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),  // enable HMR globally
    new webpack.NamedModulesPlugin() // prints more readable module names in console
  ]
};
