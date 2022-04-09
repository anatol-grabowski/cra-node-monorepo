const { aliasWebpack } = require('react-app-alias-ex')
const path = require('path')
const fs = require('fs')

/* Make a function that provided a full path to tsconfig.json goes through its 'extends' and fetches all 'compilerOption.paths' to a single object while resolving the absolute paths and making sure that parent config paths do not override the ones set in child config. Take only the first path from array. Remove trailing '/*' from the path name and from the path name. */
const getPaths = (tsconfigPath = './tsconfig.json') => {
  const paths = {}
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'))
  const tsconfigDir = path.dirname(tsconfigPath)
  const tsconfigExtends = tsconfig.extends
  if (tsconfigExtends) {
    const parentPaths = getPaths(path.resolve(tsconfigDir, tsconfigExtends))
    Object.assign(paths, parentPaths)
  }
  if (tsconfig.compilerOptions && tsconfig.compilerOptions.paths) {
    Object.entries(tsconfig.compilerOptions.paths).forEach(([key, value]) => {
      paths[key.replace(/\/\*$/, '')] = value
        .map((v) => path.resolve(tsconfigDir, v))[0]
        .replace(/\/\*$/, '')
    })
  }
  return paths
}

module.exports = function override(config) {
  const alias = getPaths()
  const makeAliases = aliasWebpack({ alias })
  config = makeAliases(config)
  return config
}
