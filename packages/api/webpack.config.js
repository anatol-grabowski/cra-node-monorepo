const path = require('path')
const { merge } = require('webpack-merge')
const {
  makeBaseConfig,
  ignoreNestjsOptionalDependenciesPluginInstance,
} = require('../../webpack.base')

module.exports = function makeConfig(env, argv) {
  const config = {
    entry: {
      main: './src/main.ts',
    },
    output: {
      filename: '[name].js',
      libraryTarget: 'commonjs',
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [ignoreNestjsOptionalDependenciesPluginInstance],
  }

  return merge(makeBaseConfig(env, argv), config)
}
