import type { Options } from '../types';

type PackageConfig = typeof initialConfig;

const initialConfig = {
  name: 'empty-project',
  version: '1.0.0',
  description: '',
  main: 'dist/bundle.js',
  keyword: [],
  author: '',
  license: 'ISC',
  scripts: {},
  dependencies: {},
  devDependencies: {},
};

function webpack(this: PackageConfig, plugins: Options['plugins']) {
  this.scripts = {
    ...this.scripts,
    build: 'webpack --mode production',
  };

  if (plugins) {
    const webpackPlugins = plugins.reduce((prev, current) => {
      if (current !== 'HotModuleReplacementPlugin') {
        prev = {
          ...prev,
          [current]: 'latest',
        };
      }

      return prev;
    }, {});

    this.devDependencies = {
      ...this.devDependencies,
      webpack: '^5.94.0',
      'webpack-cli': '^5.1.4',
      ...webpackPlugins,
    };
  }
}

// eslint-disable-next-line no-unused-vars
function react(this: PackageConfig) {
  this.scripts = {
    ...this.scripts,
    dev: 'webpack serve --mode development',
  };

  this.dependencies = {
    ...this.dependencies,
    react: '^18.3.1',
    'react-dom': '^18.3.1',
  };

  this.devDependencies = {
    ...this.devDependencies,
    'webpack-dev-server': '^5.1.0',
  };
}

// eslint-disable-next-line no-unused-vars
function svelte(this: PackageConfig) {
  this.scripts = {
    ...this.scripts,
    dev: 'webpack serve --mode development',
  };

  this.devDependencies = {
    ...this.devDependencies,
    svelte: '^4.2.19',
    'svelte-loader': '^3.2.3',
    'svelte-preprocess': '^6.0.2',
    'webpack-dev-server': '^5.1.0',
  };
}

// eslint-disable-next-line no-unused-vars
function vue(this: PackageConfig) {
  this.scripts = {
    ...this.scripts,
    dev: 'webpack serve --mode development',
  };

  this.dependencies = {
    ...this.dependencies,
    vue: '^3.5.8',
  };

  this.devDependencies = {
    ...this.devDependencies,
    'vue-loader': '^17.4.2',
    'vue-template-compiler': '^2.7.16',
    'webpack-dev-server': '^5.1.0',
  };
}

function babel(
  this: PackageConfig,
  lib: Options['lib'],
  bundler: Options['bundler']
) {
  this.devDependencies = {
    ...this.devDependencies,
    '@babel/core': '^7.25.2',
    '@babel/preset-env': '^7.25.4',
  };

  if (lib === 'react') {
    this.devDependencies = {
      ...this.devDependencies,
      '@babel/preset-react': '^7.24.7',
    };
  }

  if (bundler === 'webpack') {
    this.devDependencies = {
      ...this.devDependencies,
      'babel-loader': '^9.1.3',
    };
  }
}

// eslint-disable-next-line no-unused-vars
function typescript(this: PackageConfig) {
  this.devDependencies = {
    ...this.devDependencies,
    '@types/react': '^18.3.5',
    '@types/react-dom': '^18.3.0',
    typescript: '^5.6.2',
    'ts-loader': '^9.5.1',
  };
}

// eslint-disable-next-line no-unused-vars
function tailwind(this: PackageConfig) {
  this.devDependencies = {
    ...this.devDependencies,
    tailwindcss: 'latest',
    autoprefixer: 'latest',
    postcss: 'latest',
    'postcss-loader': 'latest',
  };
}

// eslint-disable-next-line no-unused-vars
function materialUi(this: PackageConfig) {
  this.dependencies = {
    ...this.dependencies,
    '@mui/material': 'latest',
    '@emotion/react': 'latest',
    '@emotion/styled': 'latest',
  };
}

// eslint-disable-next-line no-unused-vars
function cssStyleLoader(this: PackageConfig) {
  this.devDependencies = {
    ...this.devDependencies,
    'css-loader': '^7.1.2',
    'style-loader': '^4.0.0',
  };
}

// eslint-disable-next-line no-unused-vars
function less(this: PackageConfig) {
  this.devDependencies = {
    ...this.devDependencies,
    'less-loader': 'latest',
  };
}

// eslint-disable-next-line no-unused-vars
function scss(this: PackageConfig) {
  this.devDependencies = {
    ...this.devDependencies,
    'sass-loader': 'latest',
  };
}

// eslint-disable-next-line no-unused-vars
function fileLoader(this: PackageConfig) {
  this.devDependencies = {
    ...this.devDependencies,
    'file-loader': '^6.2.0',
  };
}

function jest(this: PackageConfig, transpiler: Options['transpiler']) {
  this.scripts = {
    ...this.scripts,
    test: 'jest',
  };

  this.devDependencies = {
    ...this.devDependencies,
    jest: 'latest',
  };

  if (transpiler?.includes('babel')) {
    this.devDependencies = {
      ...this.devDependencies,
      'babel-jest': 'latest',
    };
  }

  if (transpiler?.includes('ts')) {
    this.devDependencies = {
      ...this.devDependencies,
      'ts-jest': 'latest',
      '@types/jest': 'latest',
    };
  }
}

function vitest(this: PackageConfig, lib: Options['lib']) {
  this.scripts = {
    ...this.scripts,
    test: 'vitest',
  };

  this.devDependencies = {
    ...this.devDependencies,
    vitest: 'latest',
  };

  if (lib === 'react') {
    this.devDependencies = {
      ...this.devDependencies,
      jsdom: 'latest',
      '@vitejs/plugin-react': 'latest',
    };
  }
}

function esLint(this: PackageConfig, transpiler: Options['transpiler']) {
  this.scripts = {
    ...this.scripts,
    lint: `eslint 'src/**/*.{${getExtensions(transpiler).join(',')}}'`,
    'lint:fix': `eslint --fix 'src/**/*.{${getExtensions(transpiler).join(',')}}}'`,
  };

  this.devDependencies = {
    ...this.devDependencies,
    eslint: 'latest',
  };
}

function prettier(this: PackageConfig, transpiler: Options['transpiler']) {
  this.scripts = {
    ...this.scripts,
    format: `prettier --write 'src/**/*.{${getExtensions(transpiler).join(',')}}'`,
  };

  this.devDependencies = {
    ...this.devDependencies,
    prettier: 'latest',
  };
}

function getExtensions(transpiler: Options['transpiler']) {
  let exts = ['js'];

  if (transpiler?.includes('babel')) {
    exts = [...exts, 'jsx'];
  }

  if (transpiler?.includes('ts')) {
    exts = ['ts'];
    if (transpiler?.includes('babel')) {
      exts = [...exts, 'tsx'];
    }
  }

  return exts;
}

export function buildPackageJson(options: Options) {
  const packageJson = {
    ...initialConfig,
  };

  if (options.name) {
    packageJson.name = options.name;
  }

  if (options.bundler === 'webpack') {
    webpack.call(packageJson, options.plugins);
  }

  if (options.lib === 'react') {
    react.call(packageJson);
  }

  if (options.lib === 'svelte') {
    svelte.call(packageJson);
  }

  if (options.lib === 'vue') {
    vue.call(packageJson);
  }

  if (options.transpiler?.includes('babel')) {
    babel.call(packageJson, options.lib, options.bundler);
  }

  if (options.transpiler?.includes('ts')) {
    typescript.call(packageJson);
  }

  if (options.ui?.includes('tailwind')) {
    tailwind.call(packageJson);
  }

  if (options.ui?.includes('material-ui')) {
    materialUi.call(packageJson);
  }

  if (options.styling) {
    cssStyleLoader.call(packageJson);

    if (options.styling.includes('less')) {
      less.call(packageJson);
    }

    if (options.styling.includes('scss')) {
      scss.call(packageJson);
    }
  }

  if (options.image) {
    fileLoader.call(packageJson);
  }

  if (options.testing?.includes('jest')) {
    jest.call(packageJson, options.transpiler);
  }

  if (options.testing?.includes('vitest')) {
    vitest.call(packageJson, options.lib);
  }

  if (options.linting?.includes('eslint')) {
    esLint.call(packageJson, options.transpiler);
  }

  if (options.linting?.includes('prettier')) {
    prettier.call(packageJson, options.transpiler);
  }

  const dependencies = Object.keys(packageJson.dependencies)
    .sort()
    .reduce((prev, current) => {
      prev = {
        ...prev,
        [current]:
          packageJson.dependencies[
            current as keyof PackageConfig['dependencies']
          ],
      };
      return prev;
    }, {});

  const devDependencies = Object.keys(packageJson.devDependencies)
    .sort()
    .reduce((prev, current) => {
      prev = {
        ...prev,
        [current]:
          packageJson.devDependencies[
            current as keyof PackageConfig['devDependencies']
          ],
      };
      return prev;
    }, {});

  packageJson.devDependencies = devDependencies;
  packageJson.dependencies = dependencies;
  return JSON.stringify(packageJson, null, 2);
}
