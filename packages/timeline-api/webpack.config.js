const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = function getConfig(env, { mode }) {
  const config = {
    entry: './src/main.ts',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    target: 'node',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [new TsconfigPathsPlugin({})],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
        },
      ],
    },
    devtool: 'inline-source-map',
    optimization: {
      minimize: false,
    },
    stats: {
      hash: false,
      builtAt: false,
      assets: false,
      entrypoints: true,
      chunks: false,
      chunkOrigins: false,
      modules: false,
      timings: true,
      colors: true,
      version: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errorDetails: false,
      publicPath: false,
      warningsCount: true,
      warnings: true,
    },
  }
  if (mode !== 'production') {
    config.ignoreWarnings = [
      { module: /\/ws\/lib\//, message: /Can't resolve 'utf-8-validate'/ },
      { module: /\/ws\/lib\//, message: /Can't resolve 'bufferutil'/ },
      {
        module: /\/any-promise\//,
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ]
  }
  return config
}
