const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  devServer: {
    contentBase: './src',
    publicPath: '/output',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['react', 'es2015'] }
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // {
      //   loader: 'sass-loader',
      //   options: {
      //     includePaths: glob.sync('node_modules').map((d) => path.join(__dirname, d))
      //   }
      // },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  }
};
