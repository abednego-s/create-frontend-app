import type { Options } from '../types';

export function buildPackageJson(options: Options) {
  let packageJson = {
    name: 'empty-project',
    version: '1.0.0',
    description: '',
    main: 'dist/index.js',
    keyword: [],
    author: '',
    license: 'ISC',
    scripts: {},
    dependencies: {},
    devDependencies: {},
  };

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

    if (options.plugins) {
      const webpackPlugins = options.plugins.reduce((prev, current) => {
        prev = {
          ...prev,
          [current]: 'latest',
        };
        return prev;
      }, {});

      packageJson = {
        ...packageJson,
        devDependencies: {
          ...packageJson.devDependencies,
          ...webpackPlugins,
        },
      };
    }
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
      },
      devDependencies: {
        ...packageJson.devDependencies,
        'webpack-dev-server': '^5.1.0',
      },
    };
  }

  if (options.transpiler?.includes('babel')) {
    packageJson = {
      ...packageJson,
      devDependencies: {
        ...packageJson.devDependencies,
        'babel-loader': '^9.1.3',
        '@babel/core': '^7.25.2',
      },
    };

    if (options.lib === 'react') {
      packageJson = {
        ...packageJson,
        devDependencies: {
          ...packageJson.devDependencies,
          '@babel/preset-env': '^7.25.4',
          '@babel/preset-react': '^7.24.7',
        },
      };
    }
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

  if (options.ui?.includes('tailwind')) {
    packageJson = {
      ...packageJson,
      devDependencies: {
        ...packageJson.devDependencies,
        tailwindcss: 'latest',
        autoprefixer: 'latest',
        postcss: 'latest',
        'postcss-loader': 'latest',
      },
    };
  }

  if (options.ui?.includes('material-ui')) {
    packageJson = {
      ...packageJson,
      dependencies: {
        ...packageJson.dependencies,
        '@mui/material': 'latest',
        '@emotion/react': 'latest',
        '@emotion/styled': 'latest',
      },
    };
  }

  if (
    options.styling?.includes('css') ||
    options.styling?.includes('css-module')
  ) {
    packageJson = {
      ...packageJson,
      devDependencies: {
        ...packageJson.devDependencies,
        'css-loader': '^7.1.2',
        'style-loader': '^4.0.0',
      },
    };
  }

  if (options.image) {
    packageJson = {
      ...packageJson,
      devDependencies: {
        ...packageJson.devDependencies,
        'file-loader': '^6.2.0',
      },
    };
  }

  type Dependencies = typeof packageJson.dependencies;
  type DevDependencies = typeof packageJson.devDependencies;

  const dependencies = Object.keys(packageJson.dependencies)
    .sort()
    .reduce((prev, current) => {
      prev = {
        ...prev,
        [current]: packageJson.dependencies[current as keyof Dependencies],
      };
      return prev;
    }, {});

  const devDependencies = Object.keys(packageJson.devDependencies)
    .sort()
    .reduce((prev, current) => {
      prev = {
        ...prev,
        [current]:
          packageJson.devDependencies[current as keyof DevDependencies],
      };
      return prev;
    }, {});

  packageJson = {
    ...packageJson,
    dependencies,
    devDependencies,
  };

  return JSON.stringify(packageJson, null, 2);
}
