const path = require('path')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')

module.exports = function override(config) {
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => !(plugin instanceof ModuleScopePlugin),
  )
  config.resolve = config.resolve || {}
  config.resolve.alias = config.resolve.alias || {}
  config.resolve.alias['@common'] = path.resolve(__dirname, '../common/src')
  return config
}
