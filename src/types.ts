import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

export type Bundler = 'webpack' | 'parcel' | 'rollup';
export type Library = 'react' | 'vue' | 'svelte';
export type UI = 'tailwind' | 'material-ui';
export type Image = 'svg' | 'png' | 'jpe?g' | 'gif';
export type Styling = 'css' | 'css-module' | 'scss' | 'less';
export type Testing = 'jest' | 'vitest';
export type Transpiler = 'babel' | 'ts';
export type Optimization = 'split-vendors';
export type Font = 'ttf' | 'eot' | 'woff' | 'woff2';
export type Linting = 'eslint' | 'prettier';

export type Options = {
  name?: string;
  bundler: Bundler;
  lib?: Library;
  ui?: UI[];
  image?: Image[];
  styling?: Styling[];
  testing?: Testing[];
  transpiler?: Transpiler[];
  optimization?: Optimization[];
  font?: Font[];
  linting?: Linting[];
};

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

export type WebpackConfig = Configuration;

export type ProjectFileNames =
  | '.babelrc'
  | '.gitignore'
  | '.eslintignore'
  | '.eslintrc.json'
  | '.prettierignore'
  | '.prettierrc'
  | '__mocks__/fileMock.js'
  | '__mocks__/styleMock.js'
  | '__tests__/test.js'
  | '__tests__/test.ts'
  | 'dist/index.html'
  | 'index.html'
  | 'jest.config.cjs'
  | 'package.json'
  | 'postcss.config.cjs'
  | 'public/index.html'
  | 'README.md'
  | 'rollup.config.js'
  | 'src/App.jsx'
  | 'src/App.svelte'
  | 'src/App.tsx'
  | 'src/App.vue'
  | 'src/custom.d.ts'
  | 'src/index.js'
  | 'src/index.ts'
  | 'src/index.tsx'
  | 'src/index.html'
  | 'src/main.js'
  | 'src/main.ts'
  | 'src/styles.css'
  | 'tailwind.config.cjs'
  | 'tsconfig.json'
  | 'vitest.config.js'
  | 'webpack.config.cjs';

export type ProjectFiles = Record<ProjectFileNames, string>;
