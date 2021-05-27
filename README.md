Configs:

- husky in `.husky/`
- lint-staged in `package.json`
- prettier in `.prettierrc` extended by `.eslintrc.yaml`
- eslint in `.eslintrc.yaml` extended in packages
- typescript in `tsconfig.base.json` extended in packages
  - `path` require `tsconfig-paths-webpack-plugin` to be built by `webpack`
  - `baseUrl` in `tsconfig.base.json` is required by `tsconfig-paths-webpack-plugin`
  - `noEmit` should be true if tsc is used only for typechecking (true for CRA?)
  - comments should be removed for compatibility with `react-app-rewire-alias`
