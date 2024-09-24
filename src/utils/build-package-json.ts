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
        build: 'webpack --mode production',
      },
      devDependencies: {
        ...packageJson.devDependencies,
        webpack: '^5.94.0',
        'webpack-cli': '^5.1.4',
      },
    };

    if (options.plugins) {
      const webpackPlugins = options.plugins.reduce((prev, current) => {
        if (current !== 'HotModuleReplacementPlugin') {
          prev = {
            ...prev,
            [current]: 'latest',
          };
        }

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
        '@babel/core': '^7.25.2',
        '@babel/preset-env': '^7.25.4',
      },
    };

    if (options.lib === 'react') {
      packageJson = {
        ...packageJson,
        devDependencies: {
          ...packageJson.devDependencies,
          'babel-loader': '^9.1.3',
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

  if (options.styling) {
    packageJson = {
      ...packageJson,
      devDependencies: {
        ...packageJson.devDependencies,
        'css-loader': '^7.1.2',
        'style-loader': '^4.0.0',
      },
    };

    if (options.styling.includes('less')) {
      packageJson = {
        ...packageJson,
        devDependencies: {
          ...packageJson.devDependencies,
          'less-loader': 'latest',
        },
      };
    }

    if (options.styling.includes('scss')) {
      packageJson = {
        ...packageJson,
        devDependencies: {
          ...packageJson.devDependencies,
          'sass-loader': 'latest',
        },
      };
    }
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

  if (options.testing?.includes('jest')) {
    packageJson = {
      ...packageJson,
      scripts: {
        ...packageJson.scripts,
        test: 'jest',
      },
      devDependencies: {
        ...packageJson.devDependencies,
        jest: 'latest',
      },
    };

    if (options.transpiler?.includes('babel')) {
      packageJson = {
        ...packageJson,
        devDependencies: {
          ...packageJson.devDependencies,
          'babel-jest': 'latest',
        },
      };
    }

    if (options.transpiler?.includes('ts')) {
      packageJson = {
        ...packageJson,
        devDependencies: {
          ...packageJson.devDependencies,
          'ts-jest': 'latest',
          '@types/jest': 'latest',
        },
      };
    }
  }

  if (options.testing?.includes('vitest')) {
    packageJson = {
      ...packageJson,
      scripts: {
        ...packageJson.scripts,
        test: 'vitest',
      },
      devDependencies: {
        ...packageJson.devDependencies,
        vitest: 'latest',
      },
    };

    if (options.lib === 'react') {
      packageJson = {
        ...packageJson,
        devDependencies: {
          ...packageJson.devDependencies,
          jsdom: 'latest',
          '@vitejs/plugin-react': 'latest',
        },
      };
    }
  }

  if (options.linting) {
    let exts = ['js'];

    if (options.transpiler?.includes('babel')) {
      exts = [...exts, 'jsx'];
    }

    if (options.transpiler?.includes('ts')) {
      exts = ['ts'];
      if (options.transpiler?.includes('babel')) {
        exts = [...exts, 'tsx'];
      }
    }

    if (options.linting.includes('eslint')) {
      packageJson = {
        ...packageJson,
        scripts: {
          ...packageJson.scripts,
          lint: `eslint 'src/**/*.{${exts.join(',')}}'`,
          'lint:fix': `eslint --fix 'src/**/*.{${exts.join(',')}}}'`,
        },
        devDependencies: {
          ...packageJson.devDependencies,
          eslint: 'latest',
        },
      };
    }

    if (options.linting.includes('prettier')) {
      packageJson = {
        ...packageJson,
        scripts: {
          ...packageJson.scripts,
          format: `prettier --write 'src/**/*.{${exts.join(',')}}'`,
        },
      };
    }
  }

  if (options.linting?.includes('prettier')) {
    packageJson = {
      ...packageJson,
      devDependencies: {
        ...packageJson.devDependencies,
        prettier: 'latest',
      },
    };
  }

  const dependencies = Object.keys(packageJson.dependencies)
    .sort()
    .reduce((prev, current) => {
      prev = {
        ...prev,
        [current]:
          packageJson.dependencies[
            current as keyof typeof packageJson.dependencies
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
            current as keyof typeof packageJson.devDependencies
          ],
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
