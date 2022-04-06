## Run

- `cd packages/web && yarn run watch`
- `cd packages/api && yarn run watch`
- docker-compose doesn't work yet

## Configs

- `workspaces` monorepo config @ `package.json`
- `husky` git hooks @ `.husky/` (runs lint-staged on precommit)
- `lint-staged` config @ `package.json` (runs prettier on staged files)
- `prettier` config @ `.prettierrc` (automatically formats files)
- `eslint` config @ `.eslintrc.yaml` extended in packages @ `.eslintrc.js`
  - extends `.prettierrc` to avoid contradicting rules
  - `__dirname` is used in `.eslintrc.js` to avoid monorepo linting issues with filepaths
- `typescript` config @ `tsconfig.base.json` extended in packages @ `tsconfig.json`
  - `paths` require `tsconfig-paths-webpack-plugin` for aliases to work with **Node**
    - `baseUrl` is required by `tsconfig-paths-webpack-plugin`
  - `paths` require `react-app-rewire-alias` for aliases to work with **CRA**
    - comments should be removed from tsconfigs for compatibility with `react-app-rewire-alias`
  - `noEmit` shoud be true for **CRA** (should be true if tsc is used only for typechecking)
- **Node** `webpack` build config @ `webpack.config.js`
  - `webpack-shell-plugin-next` to watch and rerun built bundle with `nodemon`
- **CRA** `react-app-rewired` webpack config overrides @ `config-overrides.js`
  - used for tsconfig `paths` to work with CRA (via `react-app-rewire-alias`)
- `browserslist` list of supported browsers for **CRA** @ `package.json`
- `resolutions` config @ `package.json` avoids issues with `babel-loader` versions for **CRA**
- `asdf` config @ `.tool-versions`
- `docker-compose` config @ `docker-compose.yaml`
- `jest` @ `???`
- `storybook` @ `???`
