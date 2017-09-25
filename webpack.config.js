const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './public/reactStatic/src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/reactStatic/dist'),
    //publicPath: '/react'
  },
  module: {
    loaders: [
      { 
        test: /\.js[x]?$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader?presets[]=es2015&presets[]=react' 
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader',
      }, 
      { 
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, 
        loader: 'url-loader?limit=50000&name=[path][name].[ext]'
      },
      {
        test: /\.scss$/,
        loader:'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/reactStatic/index.html'),
      filename: path.join(__dirname, 'public/reactStatic/dist/index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
      contentBase: path.resolve(__dirname, 'public/reactStatic/dist'),
      historyApiFallback: true,
      hot: true
  },
};