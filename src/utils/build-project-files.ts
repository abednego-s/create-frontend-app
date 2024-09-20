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
import type { Options, ProjectFiles } from '../types';

export function buildProjectFiles(options: Options) {
  let projectFiles: ProjectFiles = {
    '.gitignore': buildGitIgnore(),
    'package.json': buildPackageJson(options),
    'src/index.js': buildEntryPoint(options),
    'README.md': buildReadme(options),
  };

  if (options.bundler === 'webpack') {
    projectFiles = {
      ...projectFiles,
      'webpack.config.json': buildWebpackConfig(options),
    };
  }

  if (options.transpiler?.includes('babel')) {
    projectFiles = {
      ...projectFiles,
      '.babelrc': buildBabelConfig(options),
    };
  }

  if (options.transpiler?.includes('ts')) {
    projectFiles = {
      ...projectFiles,
      'tsconfig.json': buildTypescriptConfig(),
    };
  }

  if (options.lib === 'react') {
    projectFiles = {
      ...projectFiles,
      'src/index.html': buildHtml(options),
    };
    if (options.transpiler?.includes('ts')) {
      projectFiles = Object.entries(projectFiles).reduce((prev, current) => {
        const [key, value] = current;
        if (key !== 'src/index.js') {
          prev = {
            ...prev,
            [key]: value,
            'src/index.ts': buildEntryPoint(options),
            'src/App.tsx': buildReactMainApp(options),
          };
        }
        return prev;
      }, {});
    } else {
      projectFiles = {
        ...projectFiles,
        'src/index.js': buildEntryPoint(options),
        'src/App.jsx': buildReactMainApp(options),
      };
    }
  }

  if (options.ui?.includes('tailwind')) {
    projectFiles = {
      ...projectFiles,
      'tailwind.config.js': buildTailwindConfig(options),
      'postcss.config.js': buildPostCssConfig(),
    };
  }

  if (options.styling?.includes('css')) {
    projectFiles = {
      ...projectFiles,
      'src/styles.css': buildStylesCss(),
    };
  }

  return projectFiles;
}
