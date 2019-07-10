const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')

module.exports = {
  // entry: {
    // app: path.resolve(__dirname, './src')
  // },
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common'
    }
  },
  output: {
    // filename:
    //   process.env.NODE_ENV === 'production'
    //     ? '[name].[chunkhash].js'
    //     : '[name].[hash].js',
    filename:`[name]-bundle.js`,
    path: path.resolve(__dirname, 'dist'),
    // 修改打包出口，在最外级目录打包出一个 index.js 文件，我们 import 默认会指向这个文件
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'src'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      common: path.resolve(__dirname, 'src/common/')
    }
  }
}
