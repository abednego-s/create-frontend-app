import type { Options, PackageConfig } from '../types';
import { BabelStrategy } from './strategies/babel-strategy';
import { CssModuleStrategy } from './strategies/css-module-strategy';
import { CssStrategy } from './strategies/css-strategy';
import { EsLintStrategy } from './strategies/eslint-strategy';
import { FileLoaderStrategy } from './strategies/file-loader-strategy';
import { JestStrategy } from './strategies/jest-strategy';
import { LessStrategy } from './strategies/less-strategy';
import { MaterialUiStrategy } from './strategies/material-ui-strategy';
import { PrettierStrategy } from './strategies/prettier-strategy';
import { ReactStrategy } from './strategies/react-strategy';
import { SassStrategy } from './strategies/sass-strategy';
import { SvelteStrategy } from './strategies/svelte-strategy';
import { TailwindStrategy } from './strategies/tailwind-strategy';
import { TypescriptStrategy } from './strategies/typescript-strategy';
import { VitestStrategy } from './strategies/vitest-strategy';
import { VueStrategy } from './strategies/vue-strategy';
import { WebpackStrategy } from './strategies/webpack-strategy';

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

  if (options.name) {
    packageJson.name = options.name;
  }

  if (options.bundler === 'webpack') {
    new WebpackStrategy(options.plugins).applyPackageConfig(packageJson);
  }

  if (options.lib === 'react') {
    new ReactStrategy().applyPackageConfig(packageJson);
  }

  if (options.lib === 'svelte') {
    new SvelteStrategy().applyPackageConfig(packageJson);
  }

  if (options.lib === 'vue') {
    new VueStrategy().applyPackageConfig(packageJson);
  }

  if (options.transpiler?.includes('babel')) {
    new BabelStrategy(options.lib, options.bundler).applyPackageConfig(
      packageJson
    );
  }

  if (options.transpiler?.includes('ts')) {
    new TypescriptStrategy().applyPackageConfig(packageJson);
  }

  if (options.ui?.includes('tailwind')) {
    new TailwindStrategy().applyPackageConfig(packageJson);
  }

  if (options.ui?.includes('material-ui')) {
    new MaterialUiStrategy().applyPackageConfig(packageJson);
  }

  if (options.styling?.includes('css')) {
    new CssStrategy().applyPackageConfig(packageJson);
  }

  if (options.styling?.includes('css-module')) {
    new CssModuleStrategy().applyPackageConfig(packageJson);
  }

  if (options.styling?.includes('less')) {
    new LessStrategy().applyPackageConfig(packageJson);
  }

  if (options.styling?.includes('scss')) {
    new SassStrategy().applyPackageConfig(packageJson);
  }

  if (options.image) {
    new FileLoaderStrategy(options.image).applyPackageConfig(packageJson);
  }

  if (options.testing?.includes('jest')) {
    new JestStrategy(options.transpiler).applyPackageConfig(packageJson);
  }

  if (options.testing?.includes('vitest')) {
    new VitestStrategy(options.lib).applyPackageConfig(packageJson);
  }

  if (options.linting?.includes('eslint')) {
    new EsLintStrategy(options.transpiler).applyPackageConfig(packageJson);
  }

  if (options.linting?.includes('prettier')) {
    new PrettierStrategy(options.transpiler).applyPackageConfig(packageJson);
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
