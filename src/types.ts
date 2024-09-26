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
export type Font = 'ttf' | 'eot' | 'woff' | 'woff2';
export type Linting = 'eslint' | 'prettier';

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
  optimization?: Optimization[];
  font?: Font[];
  linting?: Linting[];
};

export type WebpackBuildConfigOptions = Omit<Options, 'name' | 'bundler'>;

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
  | '__tests__/test.js'
  | '__tests__/test.ts'
  | 'jest.config.js'
  | 'package.json'
  | 'postcss.config.js'
  | 'README.md'
  | 'src/App.jsx'
  | 'src/App.svelte'
  | 'src/App.tsx'
  | 'src/App.vue'
  | 'src/index.js'
  | 'src/index.ts'
  | 'src/index.html'
  | 'src/styles.css'
  | 'tailwind.config.js'
  | 'tsconfig.json'
  | 'vite.config.js'
  | 'webpack.config.js';

export type ProjectFiles = Record<ProjectFileNames, string>;

export type ESLintConfig = {
  env?: ESLintConfigEnv;
  extends?: string[];
  parser?: string;
  parserOptions?: ESLintConfigParserOptions;
  plugins?: string[];
  rules?: ESLintConfigRules;
  settings?: ESLintConfigSettings;
};

export type ESLintConfigEnv = {
  browser: boolean;
  node: boolean;
  es2021: boolean;
};

export type ESLintConfigParserOptions = {
  ecmaFeatures?: ESLintConfigEcmaFeatures;
  ecmaVersion?: string;
  sourceType?: string;
};

export type ESLintConfigEcmaFeatures = {
  jsx?: boolean;
};

export type KnownESLintRuleProperties =
  | 'prettier/prettier'
  | 'react/prop-types'
  | 'react/jsx-uses-react'
  | 'react/react-in-jsx-scope'
  | 'no-unused-vars'
  | '@typescript-eslint/no-require-imports';

export type ESLintConfigRules = {
  // eslint-disable-next-line no-unused-vars
  [K in KnownESLintRuleProperties]?: 'warn' | 'off' | 'error';
};

export type ESLintConfigSettings = {
  react: {
    version: string;
  };
};

export type BuildConfig = Pick<
  Options,
  | 'plugins'
  | 'lib'
  | 'transpiler'
  | 'styling'
  | 'image'
  | 'optimization'
  | 'font'
>;
