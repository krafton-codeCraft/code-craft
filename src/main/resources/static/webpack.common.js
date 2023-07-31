// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#2-builds--project-setup
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');

module.exports = {
  entry: {
    game: './src/main/resources/static/src/client/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: {
    'pixi.js': 'pixi.js',
    'pixi.js': 'PIXI',
    'monaco-editor': 'monaco-editor'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-optional-chaining']
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      chunks: ['game'],
      template: 'src/main/resources/static/src/client/html/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['ingame'],
      template: 'src/main/resources/static/src/client/html/ingame.html',
      filename: 'ingame.html',
    }),
    new HtmlWebpackPlugin({
      chunks: ['lobby'],
      template: 'src/main/resources/static/src/client/html/lobby.html',
      filename: 'lobby.html',
    }),
  ],
  entry: {
    game: './src/main/resources/static/src/client/index.js',
    ingame: './src/main/resources/static/src/client/ingame.js',
    lobby: './src/main/resources/static/src/client/lobby.js',
  },
};