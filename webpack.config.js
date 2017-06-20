const webpack = require('webpack');
const path = require('path');

module.exports = {
  devServer: {
    hot: false,
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 8080,
    stats: 'none',
    historyApiFallback: true
  }
};
