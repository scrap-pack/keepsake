const path = require('path'),
  Webpack = require('webpack'),
  WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV !== 'development' ? 'production' : 'development',
  entry: {
    main: path.join(__dirname, '/client/index.js'),
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=/images/[name].[ext]',
      },
    ],
  },
  plugins: [
    new Webpack.ProgressPlugin(),
    new WorkboxPlugin.GenerateSW({
      swDest: path.join(__dirname, '/public/sw.js'),
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
