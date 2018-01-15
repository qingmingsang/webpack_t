const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const publicPath = './';

module.exports = {
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: publicPath,
    sourceMapFilename: '[name].map'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 开启HMR
    new HtmlWebpackPlugin({
      title: 'Output Management',
      favicon: './favicon.ico'
    }),
    //开启后会把公共的chunk打到commonjs
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // 指定公共 bundle 的名称。
    })
  ],
  devServer: {
    hot: true, // 告知 dev-server 正在使用 HMR
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: publicPath
  },
  devtool: 'cheap-module-source-map'
};