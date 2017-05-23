const { resolve } = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
  context: resolve(__dirname, 'src'),

  entry: "./src/components/app.js",
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, "./public/javascripts"),
    // necessary for HMR to know where to load the hot update chunks
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader', ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader?modules', ],
      },
    ],
  },

  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  //   // enable HMR globally

  //   new webpack.NamedModulesPlugin(),
  //   // prints more readable module names in the browser console on HMR updates

  //   new HtmlWebpackPlugin({
  //     title: 'My app'
  //   }),

  //   //new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  // ],
};