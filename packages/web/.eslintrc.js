const path = require('path')

module.exports = {
  extends: ['../../.eslintrc.yaml', 'react-app', 'react-app/jest'],
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
    {
      extends: ['plugin:jsonc/recommended-with-jsonc'],
      files: ['*.json', '*.json5', '*.jsonc'],
      parser: 'jsonc-eslint-parser',
    },
    {
      files: ['**/*.ts?(x)'],
      parserOptions: {
        /**
         * Projects are resolved relative to cwd if __dirname is not used.
         * If simply './tsconfig.json' is specified then build works ok,
         * but vscode shows 'Cannot read file tsconfig.json' eslint errors for each file.
         */
        project: [path.join(__dirname, 'tsconfig.json')],
      },
    },
  ],
  rules: {},
}
