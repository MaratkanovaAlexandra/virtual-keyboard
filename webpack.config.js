const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const plugins = () => {
  const basePlugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
      inject: true,
    }),
    new CleanWebpackPlugin(),
  ];
  return basePlugins;
};

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: plugins(),
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpe?g|gif|svg)$/i, use: [{ loader: 'file-loader', options: { name: `./img/${'[contenthash].[ext]'}` } }] },
    ],
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    compress: true,
    port: 3000,
  },
};
