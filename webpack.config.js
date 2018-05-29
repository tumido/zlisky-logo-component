const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  devServer: {
    contentBase: './src',
    publicPath: '/build',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.[hash].js',
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
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Generátor loga',
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: './src/static/zliska.svg',
        to: 'static'
      }
    ])
  ]
};
