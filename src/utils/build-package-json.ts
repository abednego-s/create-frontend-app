import type { Options } from '../types';

let packageJson = {
  name: 'empty-project',
  version: '1.0.0',
  description: '',
  main: 'index.js',
  keyword: [],
  author: '',
  license: 'ISC',
  scripts: {},
  dependencies: {},
  devDependencies: {},
};

export function buildPackageJson(options: Options) {
  if (options.name) {
    packageJson = {
      ...packageJson,
      name: options.name,
    };
  }

  if (options.bundler === 'webpack') {
    packageJson = {
      ...packageJson,
      scripts: {
        ...packageJson.scripts,
        'build:dev': 'webpack --mode development',
        'build:prod': 'webpack --mode production',
      },
      devDependencies: {
        ...packageJson.devDependencies,
        webpack: '^5.94.0',
        'webpack-cli': '^5.1.4',
      },
    };
  }

  if (options.lib === 'react') {
    packageJson = {
      ...packageJson,
      scripts: {
        ...packageJson.scripts,
        dev: 'webpack serve --mode development',
      },
      dependencies: {
        ...packageJson.dependencies,
        react: '^18.3.1',
        'react-dom': '^18.3.1',
        'react-refresh': '^0.14.2',
      },
      devDependencies: {
        ...packageJson.devDependencies,
        '@babel/preset-react': '^7.24.7',
        'babel-loader': '^9.1.3',
        '@babel/core': '^7.25.2',
        '@babel/preset-env': '^7.25.4',
        'webpack-dev-server': '^5.1.0',
      },
    };
  }

  if (options.transpiler?.includes('ts')) {
    packageJson = {
      ...packageJson,
      devDependencies: {
        ...packageJson.devDependencies,
        '@types/react': '^18.3.5',
        '@types/react-dom': '^18.3.0',
        typescript: '^5.6.2',
        'ts-loader': '^9.5.1',
      },
    };
  }

  return JSON.stringify(packageJson, null, 2);
}
