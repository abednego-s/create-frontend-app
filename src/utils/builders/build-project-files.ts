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
  projectFiles.set('README.md', buildReadme());

  if (isWebpack) {
    projectFiles.set('src/index.html', buildHtml(options));
    projectFiles.set('webpack.config.cjs', buildWebpackConfig(options));
  }

  if (isParcel) {
    projectFiles.set('src/index.html', buildHtml(options));
    projectFiles.set('src/index.js', buildEntryPoint(options));
  }

  if (isRollup) {
    projectFiles.set('dist/index.html', buildHtml(options));
    projectFiles.set('rollup.config.js', buildRollupConfig(options));
  }

  // `.babelrc` can be skipped when using Parcel
  if (useBabel && !isParcel) {
    projectFiles.set('.babelrc', buildBabelConfig(options));
  }

  if (useTypescript) {
    projectFiles.delete('src/index.js');
    projectFiles.set('src/index.ts', buildEntryPoint(options));

    // `tsconfig.json` can be skipped when using Parcel
    if (!isParcel) {
      projectFiles.set('tsconfig.json', buildTypescriptConfig(options));
    }

    if (styling || image || font) {
      projectFiles.set('src/custom.d.ts', buildModuleDeclaration(options));
    }
  }

  if (useReact) {
    projectFiles.delete('src/index.js');
    projectFiles.delete('src/index.ts');

    projectFiles.set(
      `src/App.${useTypescript ? 'tsx' : 'jsx'}`,
      buildReactMainApp(options)
    );

    projectFiles.set(
      `src/index.${useTypescript ? 'tsx' : 'jsx'}` as ProjectFileNames,
      buildEntryPoint(options)
    );
  }

  if (useSvelte) {
    projectFiles.set('src/App.svelte', buildSvelteMainApp(options));
    projectFiles.set(
      `src/index.${useTypescript ? 'ts' : 'js'}` as ProjectFileNames,
      buildEntryPoint(options)
    );

    if (useTypescript) {
      projectFiles.set('src/custom.d.ts', buildModuleDeclaration(options));
    }
  }

  if (useVue) {
    projectFiles.set('src/App.vue', buildVueMainApp());

    if (useTypescript) {
      projectFiles.set('src/custom.d.ts', buildModuleDeclaration(options));
    }
  }

  if (useTailwind) {
    projectFiles.set('src/styles.css', buildStylesCss(options));
    projectFiles.set('tailwind.config.cjs', buildTailwindConfig(options));
    projectFiles.set('postcss.config.cjs', buildPostCssConfig());
  }

  if (useCss) {
    projectFiles.set('src/styles.css', buildStylesCss(options));
  }

  if (useJest) {
    projectFiles.set('jest.config.cjs', buildJestConfig(options));
    projectFiles.set(
      '__mocks__/fileMock.js',
      "module.exports = 'test-file-stub'"
    );
    projectFiles.set('__mocks__/styleMock.js', 'module.exports = {}');
    projectFiles.set(
      `__tests__/test.${useTypescript ? 'ts' : 'js'}` as ProjectFileNames,
      buildJestTest()
    );
  }

  if (useVitest) {
    projectFiles.set('vitest.config.js', buildVitestConfig(options));
    projectFiles.set(
      `__tests__/test.${useTypescript ? 'ts' : 'js'}` as ProjectFileNames,
      buildVitestTest()
    );
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
