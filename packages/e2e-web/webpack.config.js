const path = require('path')
const { merge } = require('webpack-merge')
const { makeBaseConfig } = require('../../webpack.base')

module.exports = function makeConfig(env, argv) {
  const config = {
    entry: './src/main',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'build'),
    },
  }

  return merge(makeBaseConfig(env, argv), config)
}
