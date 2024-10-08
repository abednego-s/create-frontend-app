import { Configuration as WebpackConfiguration, RuleSetRule } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { webpackPlugins } from './utils/webpack-plugins';

export type Bundler = 'webpack' | 'parcel' | 'rollup';
export type Library = 'react' | 'vue' | 'svelte';
export type WebpackPlugins = keyof typeof webpackPlugins;
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
  plugins?: WebpackPlugins[];
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

export type WebpackRuleSetRule = RuleSetRule;

export type ProjectFileNames =
  | '.babelrc'
  | '.gitignore'
  | '.eslintignore'
  | '.eslintrc.json'
  | '.prettierignore'
  | '.prettierrc'
  | '__tests__/test.js'
  | '__tests__/test.ts'
  | 'jest.config.js'
  | 'package.json'
  | 'postcss.config.js'
  | 'README.md'
  | 'rollup.config.js'
  | 'src/App.jsx'
  | 'src/App.svelte'
  | 'src/App.tsx'
  | 'src/App.vue'
  | 'src/custom.d.ts'
  | 'src/index.js'
  | 'src/index.ts'
  | 'src/index.html'
  | 'src/styles.css'
  | 'tailwind.config.js'
  | 'tsconfig.json'
  | 'vite.config.js'
  | 'webpack.config.js';

export type ProjectFiles = Record<ProjectFileNames, string>;
