import { buildPackageJson } from './build-package-json';
import { buildWebpackConfig } from './build-webpack-config';
import { buildBabelConfig } from './build-babel-config';
import { buildReactMainApp } from './build-react-main-app';
import { buildEntryPoint } from './build-entry-point';
import { buildHtml } from './build-html';
import { buildGitIgnore } from './build-gitignore';
import { buildReadme } from './build-readme';
import { buildTailwindConfig } from './build-tailwind-config';
import { buildPostCssConfig } from './build-postcss-config';
import { buildTypescriptConfig } from './build-ts-config';
import { buildStylesCss } from './build-styles-css';
import { buildJestTest } from './build-jest-test';
import { buildJestConfig } from './build-jest-config';
import { buildEslintIgnore } from './build-eslint-ignore';
import { buildEslintConfig } from './build-eslint-config';
import { buildPrettierIgnore } from './build-prettier-ignore';
import { buildPrettierConfig } from './build-prettier-config';
import { buildVitestConfig } from './build-vitest-config';
import { buildVitestTest } from './build-vitest-test';
import { buildSvelteMainApp } from './build-svelte-main-app';
import { buildVueMainApp } from './build-vue-main-app';
import { buildModuleDeclaration } from './build-module-declaration';
import { buildRollupConfig } from './build-rollup-config';
import { Options, ProjectFileNames } from '../../types';

export async function buildProjectFiles(options: Options) {
  const {
    bundler,
    font,
    image,
    lib,
    linting,
    styling,
    testing,
    transpiler,
    ui,
  } = options;

  const isBabel = transpiler?.includes('babel') ?? false;
  const isTypescript = transpiler?.includes('ts') ?? false;
  const isReact = lib === 'react';
  const isSvelte = lib === 'svelte';
  const isVue = lib === 'vue';
  const isParcel = bundler === 'parcel';
  const isWebpack = bundler === 'webpack';
  const isRollup = bundler === 'rollup';
  const isTailwind = ui?.includes('tailwind') ?? false;
  const isCss = styling?.includes('css') ?? false;
  const isJest = testing?.includes('jest') ?? false;
  const isVitest = testing?.includes('vitest') ?? false;
  const isEslint = linting?.includes('eslint') ?? false;
  const isPrettier = linting?.includes('prettier') ?? false;

  const projectFiles = new Map<ProjectFileNames, string>();

  projectFiles.set('.gitignore', buildGitIgnore());
  projectFiles.set('package.json', await buildPackageJson(options));
  projectFiles.set('src/index.js', buildEntryPoint(options));
  projectFiles.set('README.md', buildReadme(options));

  if (isWebpack) {
    projectFiles.set('webpack.config.js', buildWebpackConfig(options));
  }

  if (isParcel) {
    projectFiles.set('src/index.html', buildHtml(options));
    projectFiles.set('src/index.js', buildEntryPoint(options));
  }

  if (isRollup) {
    projectFiles.set('src/index.html', buildHtml(options));
    projectFiles.set('rollup.config.js', buildRollupConfig(options));
  }

  if (isBabel) {
    projectFiles.set('.babelrc', buildBabelConfig(options));
  }

  if (isTypescript) {
    projectFiles.delete('src/index.js');
    projectFiles.set('tsconfig.json', buildTypescriptConfig(options));
    projectFiles.set('src/index.ts', buildEntryPoint(options));

    if (styling || image || font) {
      projectFiles.set('src/custom.d.ts', buildModuleDeclaration(options));
    }
  }

  if (isReact) {
    projectFiles.set('src/index.html', buildHtml(options));

    if (isTypescript) {
      projectFiles.set('src/App.tsx', buildReactMainApp(options));
    } else {
      projectFiles.set('src/App.jsx', buildReactMainApp(options));
    }
  }

  if (isSvelte) {
    projectFiles.set('src/index.html', buildHtml(options));
    projectFiles.set('src/App.svelte', buildSvelteMainApp(options));

    if (isTypescript) {
      projectFiles.set('src/index.ts', buildEntryPoint(options));
    } else {
      projectFiles.set('src/index.js', buildEntryPoint(options));
    }
  }

  if (isVue) {
    projectFiles.set('src/index.html', buildHtml(options));
    projectFiles.set('src/App.vue', buildVueMainApp());

    if (isTypescript) {
      projectFiles.set('src/index.ts', buildEntryPoint(options));
    } else {
      projectFiles.set('src/index.js', buildEntryPoint(options));
    }
  }

  if (isTailwind) {
    projectFiles.set('tailwind.config.js', buildTailwindConfig(options));
    projectFiles.set('postcss.config.js', buildPostCssConfig());
    projectFiles.set('src/styles.css', buildStylesCss(options));
  }

  if (isCss) {
    projectFiles.set('src/styles.css', buildStylesCss(options));
  }

  if (isJest) {
    projectFiles.set('jest.config.js', buildJestConfig(options));
    projectFiles.set(
      '__mocks__/fileMock.js',
      "module.exports = 'test-file-stub'"
    );
    projectFiles.set('__mocks__/styleMock.js', 'module.exports = {}');

    if (isTypescript) {
      projectFiles.set('__tests__/test.ts', buildJestTest());
    } else {
      projectFiles.set('__tests__/test.js', buildJestTest());
    }
  }

  if (isVitest) {
    projectFiles.set('vitest.config.js', buildVitestConfig(options));

    if (isTypescript) {
      projectFiles.set('__tests__/test.ts', buildVitestTest());
    } else {
      projectFiles.set('__tests__/test.js', buildVitestTest());
    }
  }

  if (isEslint) {
    projectFiles.set('.eslintignore', buildEslintIgnore());
    projectFiles.set('.eslintrc.json', buildEslintConfig(options));
  }

  if (isPrettier) {
    projectFiles.set('.prettierignore', buildPrettierIgnore());
    projectFiles.set('.prettierrc', buildPrettierConfig());
  }

  return projectFiles;
}
