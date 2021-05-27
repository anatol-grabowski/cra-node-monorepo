const { alias, configPaths } = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias(configPaths('../../tsconfig.base.json'))(config)
  return config
}
