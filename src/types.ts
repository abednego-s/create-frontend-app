import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { webpackPlugins } from './utils/webpack-plugins';

export type Bundler = 'webpack' | 'parcel' | 'esbuild';
export type Library = 'react' | 'vue' | 'svelte';
export type WebpackPlugins = keyof typeof webpackPlugins;
export type UI = 'tailwind' | 'material-ui';
export type Image = 'svg' | 'png' | 'jpg' | 'gif';
export type Styling = 'css' | 'css-module' | 'scss' | 'less';
export type Testing = 'jest' | 'vitest';
export type Transpiler = 'babel' | 'ts';
export type Optimization = 'split-vendors';

export type Options = {
  name?: string;
  bundler: Bundler;
  lib?: Library;
  plugins?: WebpackPlugins[];
  ui?: UI[];
  image: Image[];
  styling: Styling[];
  testing?: Testing[];
  transpiler?: Transpiler[];
  optimization: Optimization[];
};

export type WebpackBuildConfigOptions = Omit<Options, 'name' | 'bundler'>;

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

export type WebpackConfig = Configuration;

export type ProjectFileNames =
  | '.babelrc'
  | '.gitignore'
  | '__tests__/test.js'
  | '__tests__/test.ts'
  | 'jest.config.js'
  | 'package.json'
  | 'postcss.config.js'
  | 'README.md'
  | 'src/App.jsx'
  | 'src/App.tsx'
  | 'src/index.js'
  | 'src/index.ts'
  | 'src/index.html'
  | 'src/styles.css'
  | 'tailwind.config.js'
  | 'tsconfig.json'
  | 'webpack.config.json';

export type ProjectFiles = { [K: string]: string };
