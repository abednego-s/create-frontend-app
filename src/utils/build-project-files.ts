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
import { buildViteConfig } from './build-vite-config';
import { buildViteTest } from './build-vite-test';
import { buildSvelteMainApp } from './build-svelte-main-app';
import { buildVueMainApp } from './build-vue-main-app';
import type { Options, ProjectFileNames } from '../types';

export function buildProjectFiles(options: Options) {
  const config = {
    isTypeScript: options.transpiler?.includes('ts'),
    isWebpack: options.bundler === 'webpack',
    isBabel: options.transpiler?.includes('babel'),
    isReact: options.lib === 'react',
    isSvelte: options.lib === 'svelte',
    isVue: options.lib === 'vue',
    hasTailwind: options.ui?.includes('tailwind'),
    hasCSS: options.styling?.includes('css'),
    hasJest: options.testing?.includes('jest'),
    hasVitest: options.testing?.includes('vitest'),
    hasESLint: options.linting?.includes('eslint'),
    hasPrettier: options.linting?.includes('prettier'),
  };

  const projectFiles = new Map<ProjectFileNames, string>();

  projectFiles.set('.gitignore', buildGitIgnore());
  projectFiles.set('package.json', buildPackageJson(options));
  projectFiles.set('src/index.js', buildEntryPoint(options));
  projectFiles.set('README.md', buildReadme(options));

  if (config.isWebpack) {
    projectFiles.set('webpack.config.js', buildWebpackConfig(options));
  }

  if (config.isBabel) {
    projectFiles.set('.babelrc', buildBabelConfig(options));
  }

  if (config.isTypeScript) {
    projectFiles.delete('src/index.js');
    projectFiles.set('tsconfig.json', buildTypescriptConfig(options));
    projectFiles.set('src/index.ts', buildEntryPoint(options));
  }

  if (config.isReact) {
    projectFiles.set('src/index.html', buildHtml());

    if (options.transpiler?.includes('ts')) {
      projectFiles.set('src/App.tsx', buildReactMainApp(options));
    } else {
      projectFiles.set('src/App.jsx', buildReactMainApp(options));
    }
  }

  if (config.isSvelte) {
    projectFiles.set('src/index.html', buildHtml());
    projectFiles.set('src/App.svelte', buildSvelteMainApp(options));

    if (options.transpiler?.includes('ts')) {
      projectFiles.set('src/index.ts', buildEntryPoint(options));
    } else {
      projectFiles.set('src/index.js', buildEntryPoint(options));
    }
  }

  if (config.isVue) {
    projectFiles.set('src/index.html', buildHtml());
    projectFiles.set('src/App.vue', buildVueMainApp());

    if (options.transpiler?.includes('ts')) {
      projectFiles.set('src/index.ts', buildEntryPoint(options));
    } else {
      projectFiles.set('src/index.js', buildEntryPoint(options));
    }
  }

  if (config.hasTailwind) {
    projectFiles.set('tailwind.config.js', buildTailwindConfig(options));
    projectFiles.set('postcss.config.js', buildPostCssConfig());
  }

  if (config.hasCSS) {
    projectFiles.set('src/styles.css', buildStylesCss());
  }

  if (config.hasJest) {
    projectFiles.set('jest.config.js', buildJestConfig(options));

    if (config.isTypeScript) {
      projectFiles.set('__tests__/test.ts', buildJestTest());
    } else {
      projectFiles.set('__tests__/test.js', buildJestTest());
    }
  }

  if (config.hasVitest) {
    projectFiles.set('vite.config.js', buildViteConfig(options));

    if (options.transpiler?.includes('ts')) {
      projectFiles.set('__tests__/test.ts', buildViteTest());
    } else {
      projectFiles.set('__tests__/test.js', buildViteTest());
    }
  }

  if (config.hasESLint) {
    projectFiles.set('.eslintignore', buildEslintIgnore());
    projectFiles.set('.eslintrc.json', buildEslintConfig(options));
  }

  if (config.hasPrettier) {
    projectFiles.set('.prettierignore', buildPrettierIgnore());
    projectFiles.set('.prettierrc', buildPrettierConfig());
  }

  return projectFiles;
}
