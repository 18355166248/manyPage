const merge = require('webpack-merge')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const glob = require('glob')

const setMpa = () => {
  const entry = {}
  const htmlWebpackPlugins = []

  const entryFiles = glob.sync('./src/*/*.js')

  entryFiles.forEach(v => {
    let pathName = v.match(/src\/(.*)\/index\.js/)
    const name = pathName && pathName[1]

    entry[name] = `./${pathName[0]}`

    console.log(`./src/${name}/index.html`)
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: `./src/${name}/index.html`,
        filename: `${name}.html`,
        chunks: [pathName],
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true
        },
        chunks: [name]
      })
    )
  })
  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMpa()

console.log(entry)

module.exports = merge(common, {
  // devtool: 'source-map', // 消耗资源 可以不需要
  mode: 'production',
  entry,
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // })
  ].concat(htmlWebpackPlugins)
})
