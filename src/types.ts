import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { webpackPlugins } from './utils/webpack-plugins';

export type InputProps = {
  name: string;
  id: string;
  label: string;
};

export type Bundler = 'webpack' | 'parcel' | 'esbuild';
export type Library = 'react' | 'vue' | 'svelte';
export type WebpackPlugins = keyof typeof webpackPlugins;
export type UI = 'tailwind' | 'material';
export type Testing = 'jest' | 'mocha' | 'chai';
export type Transpiler = 'babel' | 'ts';

export type Options = {
  name?: string;
  bundler: Bundler;
  lib?: Library;
  plugins?: WebpackPlugins[];
  ui?: UI[];
  testing?: Testing[];
  transpiler?: Transpiler[];
};

export type WebpackBuildConfigOptions = Omit<Options, 'name' | 'bundler'>;

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

export type WebpackConfig = Configuration;

export type ProjectFilesNames =
  | '.babelrc'
  | '.gitignore'
  | 'webpack.config.json'
  | 'src/index.js'
  | 'src/index.ts'
  | 'package.json'
  | 'README.md'
  | 'tailwind.config.js';

export type ProjectFiles = {
  // eslint-disable-next-line no-unused-vars
  [key in ProjectFilesNames]?: string;
};
