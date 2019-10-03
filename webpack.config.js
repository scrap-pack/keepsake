const path = require('path');

module.exports = {
  mode: 'development',
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
};
