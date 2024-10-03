import type { Options, PackageConfig } from '../../types';
import { BabelStrategy } from '../strategies/babel-strategy';
import { CssModuleStrategy } from '../strategies/css-module-strategy';
import { CssStrategy } from '../strategies/css-strategy';
import { EsLintStrategy } from '../strategies/eslint-strategy';
import { FileLoaderStrategy } from '../strategies/file-loader-strategy';
import { JestStrategy } from '../strategies/jest-strategy';
import { LessStrategy } from '../strategies/less-strategy';
import { MaterialUiStrategy } from '../strategies/material-ui-strategy';
import { PrettierStrategy } from '../strategies/prettier-strategy';
import { ReactStrategy } from '../strategies/react-strategy';
import { SassStrategy } from '../strategies/sass-strategy';
import { SvelteStrategy } from '../strategies/svelte-strategy';
import { TailwindStrategy } from '../strategies/tailwind-strategy';
import { TypescriptStrategy } from '../strategies/typescript-strategy';
import { VitestStrategy } from '../strategies/vitest-strategy';
import { VueStrategy } from '../strategies/vue-strategy';
import { WebpackStrategy } from '../strategies/webpack-strategy';

export function buildPackageJson(options: Options) {
  const packageJson: PackageConfig = {
    name: 'empty-project',
    version: '1.0.0',
    description: '',
    main: 'dist/bundle.js',
    keywords: [],
    author: '',
    license: 'ISC',
    scripts: {},
    dependencies: {},
    devDependencies: {},
  };

  const {
    bundler,
    image,
    lib,
    linting,
    name,
    plugins,
    styling,
    testing,
    transpiler,
    ui,
  } = options;

  const isBabel = transpiler?.includes('babel');
  const isTypescript = transpiler?.includes('ts');
  const isReact = lib === 'react';
  const isWebpack = bundler === 'webpack';

  if (name) {
    packageJson.name = name;
  }

  if (bundler === 'webpack') {
    new WebpackStrategy({
      plugins,
    }).applyPackageConfig(packageJson);
  }

  if (lib === 'react') {
    new ReactStrategy().applyPackageConfig(packageJson);
  }

  if (lib === 'svelte') {
    new SvelteStrategy().applyPackageConfig(packageJson);
  }

  if (lib === 'vue') {
    new VueStrategy().applyPackageConfig(packageJson);
  }

  if (transpiler?.includes('babel')) {
    new BabelStrategy({
      isReact,
      isWebpack,
    }).applyPackageConfig(packageJson);
  }

  if (transpiler?.includes('ts')) {
    new TypescriptStrategy({
      isBabel,
    }).applyPackageConfig(packageJson);
  }

  if (ui?.includes('tailwind')) {
    new TailwindStrategy().applyPackageConfig(packageJson);
  }

  if (ui?.includes('material-ui')) {
    new MaterialUiStrategy().applyPackageConfig(packageJson);
  }

  if (styling?.includes('css')) {
    new CssStrategy().applyPackageConfig(packageJson);
  }

  if (styling?.includes('css-module')) {
    new CssModuleStrategy().applyPackageConfig(packageJson);
  }

  if (styling?.includes('less')) {
    new LessStrategy().applyPackageConfig(packageJson);
  }

  if (styling?.includes('scss')) {
    new SassStrategy().applyPackageConfig(packageJson);
  }

  if (image) {
    new FileLoaderStrategy({ assets: image }).applyPackageConfig(packageJson);
  }

  if (testing?.includes('jest')) {
    new JestStrategy({
      isBabel,
      isTypescript,
    }).applyPackageConfig(packageJson);
  }

  if (testing?.includes('vitest')) {
    new VitestStrategy({ isReact }).applyPackageConfig(packageJson);
  }

  if (linting?.includes('eslint')) {
    new EsLintStrategy({
      isBabel,
      isTypescript,
    }).applyPackageConfig(packageJson);
  }

  if (linting?.includes('prettier')) {
    new PrettierStrategy({
      isBabel,
      isTypescript,
    }).applyPackageConfig(packageJson);
  }

  const dependencies = Object.keys(packageJson.dependencies || {})
    .sort()
    .reduce((prev, current) => {
      prev = {
        ...prev,
        [current]:
          packageJson.dependencies?.[
            current as keyof PackageConfig['dependencies']
          ],
      };
      return prev;
    }, {});

  const devDependencies = Object.keys(packageJson.devDependencies || {})
    .sort()
    .reduce((prev, current) => {
      prev = {
        ...prev,
        [current]:
          packageJson.devDependencies?.[
            current as keyof PackageConfig['devDependencies']
          ],
      };
      return prev;
    }, {});

  packageJson.devDependencies = devDependencies;
  packageJson.dependencies = dependencies;
  return JSON.stringify(packageJson, null, 2);
}
