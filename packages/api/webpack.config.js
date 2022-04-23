const path = require('path')
const webpack = require('webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin-next')

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
    plugins: [
      new webpack.IgnorePlugin({
        checkResource(resource) {
          const lazyImports = [
            '@nestjs/microservices',
            '@nestjs/platform-express',
            '@nestjs/grahpql',
            '@nestjs/microservices/microservices-module',
            '@nestjs/websockets/socket-module',
            'cache-manager',
            'class-validator',
            'class-transformer',
          ]
          // if (resource.startsWith('@nestjs/')) {
          //   return false
          // }
          if (!lazyImports.includes(resource)) {
            return false
          }
          try {
            require.resolve(resource)
          } catch (err) {
            return true
          }
          return false
        },
      }),
    ],
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
        message: /Critical dependency: the request of a dependency is an expression/,
      },
    ]
  }
  if (process.env.ON_INITIAL_BUILD_END) {
    const wpShellPlugin = new WebpackShellPlugin({
      onBuildEnd: {
        scripts: [process.env.ON_INITIAL_BUILD_END],
        blocking: false,
        parallel: true,
      },
    })
    config.plugins.push(wpShellPlugin)
  }
  return config
}
