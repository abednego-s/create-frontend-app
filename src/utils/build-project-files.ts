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
import type { Options, ProjectFileNames } from '../types';

export function buildProjectFiles(options: Options) {
  const projectFiles = new Map<ProjectFileNames, string>();

  projectFiles.set('.gitignore', buildGitIgnore());
  projectFiles.set('package.json', buildPackageJson(options));
  projectFiles.set('src/index.js', buildEntryPoint(options));
  projectFiles.set('README.md', buildReadme(options));

  if (options.bundler === 'webpack') {
    projectFiles.set('webpack.config.json', buildWebpackConfig(options));
  }

  if (options.transpiler?.includes('babel')) {
    projectFiles.set('.babelrc', buildBabelConfig(options));
  }

  if (options.transpiler?.includes('ts')) {
    projectFiles.delete('src/index.js');
    projectFiles.set('tsconfig.json', buildTypescriptConfig());
    projectFiles.set('src/index.ts', buildEntryPoint(options));
  }

  if (options.lib === 'react') {
    projectFiles.set('src/index.html', buildHtml(options));

    if (options.transpiler?.includes('ts')) {
      projectFiles.set('src/App.tsx', buildReactMainApp(options));
    } else {
      projectFiles.set('src/App.jsx', buildReactMainApp(options));
    }
  }

  if (options.ui?.includes('tailwind')) {
    projectFiles.set('tailwind.config.js', buildTailwindConfig(options));
    projectFiles.set('postcss.config.js', buildPostCssConfig());
  }

  if (options.styling?.includes('css')) {
    projectFiles.set('src/styles.css', buildStylesCss());
  }

  if (options.testing?.includes('jest')) {
    projectFiles.set('jest.config.js', buildJestConfig(options));

    if (options.transpiler?.includes('ts')) {
      projectFiles.set('__tests__/test.ts', buildJestTest());
    } else {
      projectFiles.set('__tests__/test.js', buildJestTest());
    }
  }

  if (options.testing?.includes('vitest')) {
    projectFiles.set('vite.config.js', buildViteConfig(options));

    if (options.transpiler?.includes('ts')) {
      projectFiles.set('__tests__/test.ts', buildViteTest());
    } else {
      projectFiles.set('__tests__/test.js', buildViteTest());
    }
  }

  if (options.linting?.includes('eslint')) {
    projectFiles.set('.eslintignore', buildEslintIgnore());
    projectFiles.set('.eslintrc.json', buildEslintConfig(options));
  }

  if (options.linting?.includes('prettier')) {
    projectFiles.set('.prettierignore', buildPrettierIgnore());
    projectFiles.set('.prettierrc', buildPrettierConfig());
  }

  return projectFiles;
}
