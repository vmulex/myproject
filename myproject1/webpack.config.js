// const { resolve } = require('path');
// const webpack = require('webpack');
// // const HtmlWebpackPlugin = require('html-webpack-plugin');
// // const OpenBrowserPlugin = require('open-browser-webpack-plugin')

// module.exports = {
//   // context: resolve(__dirname, 'src'),

//   entry: "./src/components/app.js",
//   output: {
//     filename: 'bundle.js',
//     // the output bundle

//     path: resolve(__dirname, "./public/javascripts"),
//     // necessary for HMR to know where to load the hot update chunks
//   },

//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         use: [ 'babel-loader', ],
//         loader: "babel-loader",
//         exclude: /node_modules/,
//         query: {
//             presets: ['es2015', 'react', 'stage-0'] // <--- here
//         }
//       },
//       {
//         test: /\.css$/,
//         use: [ 'style-loader', 'css-loader?modules', ],
//       },
//     ],
//   },
// };

 var path = require("path");
 
 module.exports={
     // 项目入口
     entry:  "./src/components/app.js",
     // 打包文件输出路径
     output: {
         path: path.join(__dirname,"./public/javascripts"),
         filename: "bundle.js",
     },
     module: {
         loaders: [{
             test: /\.js$/, 
             loader: "babel-loader",
             query: {
                 presets: ['react','es2015']
             }
         },{
             test: /\.jsx$/,
             loader: 'babel-loader', 
             query: {
                 presets: ['react', 'es2015']
             }
         },{
             test: /\.css$/, 
             loader: "style!css"
         },{
             test: /\.(jpg|png|otf)$/, 
             loader: "url?limit=8192"
         },{
             test: /\.scss$/,
             loader: "style!css!sass"
         }]
     }
 };