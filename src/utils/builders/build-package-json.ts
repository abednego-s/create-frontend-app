import { BabelStrategy } from '../strategies/babel-strategy';
import { CssModuleStrategy } from '../strategies/css-module-strategy';
import { CssStrategy } from '../strategies/css-strategy';
import { EsLintStrategy } from '../strategies/eslint-strategy';
import { FileLoaderStrategy } from '../strategies/file-loader-strategy';
import { JestStrategy } from '../strategies/jest-strategy';
import { LessStrategy } from '../strategies/less-strategy';
import { MaterialUiStrategy } from '../strategies/material-ui-strategy';
import { ParcelStrategy } from '../strategies/parcel-strategy';
import { PrettierStrategy } from '../strategies/prettier-strategy';
import { ReactStrategy } from '../strategies/react-strategy';
import { SassStrategy } from '../strategies/sass-strategy';
import { SvelteStrategy } from '../strategies/svelte-strategy';
import { TailwindStrategy } from '../strategies/tailwind-strategy';
import { TypescriptStrategy } from '../strategies/typescript-strategy';
import { VitestStrategy } from '../strategies/vitest-strategy';
import { VueStrategy } from '../strategies/vue-strategy';
import { WebpackStrategy } from '../strategies/webpack-strategy';
import type { Options, PackageConfig } from '../../types';

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
  const isSvelte = lib === 'svelte';
  const isVue = lib === 'vue';

  const isParcel = bundler === 'parcel';
  const isWebpack = bundler === 'webpack';

  const isTailwind = ui?.includes('tailwind');
  const isMaterialUi = ui?.includes('material-ui');

  const isCss = styling?.includes('css');
  const isCssModule = styling?.includes('css-module');
  const isLess = styling?.includes('less');
  const isSass = styling?.includes('scss');

  const isJest = testing?.includes('jest');
  const isVitest = testing?.includes('vitest');

  const isEslint = linting?.includes('eslint');
  const isPrettier = linting?.includes('prettier');

  if (name) {
    packageJson.name = name;
  }

  if (isWebpack) {
    new WebpackStrategy({
      plugins,
    }).applyPackageConfig(packageJson);
  }

  if (isParcel) {
    new ParcelStrategy().applyPackageConfig(packageJson);
  }

  if (isReact) {
    new ReactStrategy().applyPackageConfig(packageJson);
  }

  if (isSvelte) {
    new SvelteStrategy().applyPackageConfig(packageJson);
  }

  if (isVue) {
    new VueStrategy().applyPackageConfig(packageJson);
  }

  if (isBabel) {
    new BabelStrategy({
      isReact,
      isWebpack,
    }).applyPackageConfig(packageJson);
  }

  if (isTypescript) {
    new TypescriptStrategy({
      isBabel,
      isReact,
      isWebpack,
    }).applyPackageConfig(packageJson);
  }

  if (isTailwind) {
    new TailwindStrategy().applyPackageConfig(packageJson);
  }

  if (isMaterialUi) {
    new MaterialUiStrategy().applyPackageConfig(packageJson);
  }

  if (isCss) {
    new CssStrategy({ isWebpack }).applyPackageConfig(packageJson);
  }

  if (isCssModule) {
    new CssModuleStrategy({ isWebpack }).applyPackageConfig(packageJson);
  }

  if (isLess) {
    new LessStrategy().applyPackageConfig(packageJson);
  }

  if (isSass) {
    new SassStrategy({ isWebpack }).applyPackageConfig(packageJson);
  }

  if (image) {
    new FileLoaderStrategy({ assets: image }).applyPackageConfig(packageJson);
  }

  if (isJest) {
    new JestStrategy({
      isBabel,
      isTypescript,
    }).applyPackageConfig(packageJson);
  }

  if (isVitest) {
    new VitestStrategy({ isReact }).applyPackageConfig(packageJson);
  }

  if (isEslint) {
    new EsLintStrategy({
      isBabel,
      isTypescript,
    }).applyPackageConfig(packageJson);
  }

  if (isPrettier) {
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
