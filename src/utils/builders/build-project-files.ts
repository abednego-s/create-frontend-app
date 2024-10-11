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

  const useBabel = transpiler?.includes('babel') ?? false;
  const useTypescript = transpiler?.includes('ts') ?? false;
  const useReact = lib === 'react';
  const useSvelte = lib === 'svelte';
  const useVue = lib === 'vue';
  const isParcel = bundler === 'parcel';
  const isWebpack = bundler === 'webpack';
  const isRollup = bundler === 'rollup';
  const useTailwind = ui?.includes('tailwind') ?? false;
  const useCss = styling?.includes('css') ?? false;
  const useJest = testing?.includes('jest') ?? false;
  const useVitest = testing?.includes('vitest') ?? false;
  const useEslint = linting?.includes('eslint') ?? false;
  const usePrettier = linting?.includes('prettier') ?? false;

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

  if (useBabel) {
    projectFiles.set('.babelrc', buildBabelConfig(options));
  }

  if (useTypescript) {
    projectFiles.delete('src/index.js');
    projectFiles.set('tsconfig.json', buildTypescriptConfig(options));
    projectFiles.set('src/index.ts', buildEntryPoint(options));

    if (styling || image || font) {
      projectFiles.set('src/custom.d.ts', buildModuleDeclaration(options));
    }
  }

  if (useReact) {
    projectFiles.set('src/index.html', buildHtml(options));

    if (useTypescript) {
      projectFiles.set('src/App.tsx', buildReactMainApp(options));
    } else {
      projectFiles.set('src/App.jsx', buildReactMainApp(options));
    }
  }

  if (useSvelte) {
    projectFiles.set('src/index.html', buildHtml(options));
    projectFiles.set('src/App.svelte', buildSvelteMainApp(options));

    if (useTypescript) {
      projectFiles.set('src/index.ts', buildEntryPoint(options));
    } else {
      projectFiles.set('src/index.js', buildEntryPoint(options));
    }
  }

  if (useVue) {
    projectFiles.set('src/index.html', buildHtml(options));
    projectFiles.set('src/App.vue', buildVueMainApp());

    if (useTypescript) {
      projectFiles.set('src/index.ts', buildEntryPoint(options));
    } else {
      projectFiles.set('src/index.js', buildEntryPoint(options));
    }
  }

  if (useTailwind) {
    projectFiles.set('tailwind.config.js', buildTailwindConfig(options));
    projectFiles.set('postcss.config.js', buildPostCssConfig());
    projectFiles.set('src/styles.css', buildStylesCss(options));
  }

  if (useCss) {
    projectFiles.set('src/styles.css', buildStylesCss(options));
  }

  if (useJest) {
    projectFiles.set('jest.config.js', buildJestConfig(options));
    projectFiles.set(
      '__mocks__/fileMock.js',
      "module.exports = 'test-file-stub'"
    );
    projectFiles.set('__mocks__/styleMock.js', 'module.exports = {}');

    if (useTypescript) {
      projectFiles.set('__tests__/test.ts', buildJestTest());
    } else {
      projectFiles.set('__tests__/test.js', buildJestTest());
    }
  }

  if (useVitest) {
    projectFiles.set('vitest.config.js', buildVitestConfig(options));

    if (useTypescript) {
      projectFiles.set('__tests__/test.ts', buildVitestTest());
    } else {
      projectFiles.set('__tests__/test.js', buildVitestTest());
    }
  }

  if (useEslint) {
    projectFiles.set('.eslintignore', buildEslintIgnore());
    projectFiles.set('.eslintrc.json', buildEslintConfig(options));
  }

  if (usePrettier) {
    projectFiles.set('.prettierignore', buildPrettierIgnore());
    projectFiles.set('.prettierrc', buildPrettierConfig());
  }

  return projectFiles;
}
