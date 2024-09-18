import { buildPackageJson } from './build-package-json';
import { buildWebpackConfig } from './build-webpack-config';
import type { Options, ProjectFiles } from '../types';

export function buildProjectFiles(options: Options) {
  let projectFiles: ProjectFiles = {
    '.gitignore': 'node_modules',
    'package.json': buildPackageJson(options),
    'src/index.js': 'console.log("hello")',
    'README.md': '## empty project',
  };

  if (options.bundler === 'webpack') {
    projectFiles = {
      ...projectFiles,
      'webpack.config.json': buildWebpackConfig(options),
    };
  }

  if (options.lib === 'react') {
    projectFiles = {
      ...projectFiles,
      '.babelrc': '{}',
    };
  }

  if (options.ui?.includes('tailwind')) {
    projectFiles = {
      ...projectFiles,
      'tailwind.config.js': '{}',
    };
  }

  return projectFiles;
}
