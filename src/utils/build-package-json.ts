import type { Options } from '../types';

const packageJson = {
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

function webpack(plugins: Options['plugins']) {
  let config = {
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

    config = {
      ...config,
      devDependencies: {
        ...config.devDependencies,
        ...webpackPlugins,
      },
    };
  }

  return config;
}

function react() {
  const config = {
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

  return config;
}

function svelte() {
  const config = {
    ...packageJson,
    scripts: {
      ...packageJson.scripts,
      dev: 'webpack serve --mode development',
    },
    devDependencies: {
      ...packageJson.devDependencies,
      svelte: '^4.2.19',
      'svelte-loader': '^3.2.3',
      'svelte-preprocess': '^6.0.2',
      'webpack-dev-server': '^5.1.0',
    },
  };

  return config;
}

function vue() {
  const config = {
    ...packageJson,
    scripts: {
      ...packageJson.scripts,
      dev: 'webpack serve --mode development',
    },
    dependencies: {
      ...packageJson.dependencies,
      vue: '^3.5.8',
    },
    devDependencies: {
      ...packageJson.devDependencies,
      'vue-loader': '^17.4.2',
      'vue-template-compiler': '^2.7.16',
      'webpack-dev-server': '^5.1.0',
    },
  };

  return config;
}

function babel(lib: Options['lib']) {
  const config = {
    ...packageJson,
    devDependencies: {
      ...packageJson.devDependencies,
      '@babel/core': '^7.25.2',
      '@babel/preset-env': '^7.25.4',
    },
  };

  if (lib === 'react') {
    const config = {
      ...packageJson,
      devDependencies: {
        ...packageJson.devDependencies,
        'babel-loader': '^9.1.3',
        '@babel/preset-react': '^7.24.7',
      },
    };

    return config;
  }

  return config;
}

function typescript() {
  const config = {
    ...packageJson,
    devDependencies: {
      ...packageJson.devDependencies,
      '@types/react': '^18.3.5',
      '@types/react-dom': '^18.3.0',
      typescript: '^5.6.2',
      'ts-loader': '^9.5.1',
    },
  };

  return config;
}

function tailwind() {
  const config = {
    ...packageJson,
    devDependencies: {
      ...packageJson.devDependencies,
      tailwindcss: 'latest',
      autoprefixer: 'latest',
      postcss: 'latest',
      'postcss-loader': 'latest',
    },
  };

  return config;
}

function materialUi() {
  const config = {
    ...packageJson,
    dependencies: {
      ...packageJson.dependencies,
      '@mui/material': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
    },
  };

  return config;
}

function cssStyleLoader() {
  const config = {
    ...packageJson,
    devDependencies: {
      ...packageJson.devDependencies,
      'css-loader': '^7.1.2',
      'style-loader': '^4.0.0',
    },
  };

  return config;
}

function less() {
  const config = {
    ...packageJson,
    devDependencies: {
      ...packageJson.devDependencies,
      'less-loader': 'latest',
    },
  };

  return config;
}

function scss() {
  const config = {
    ...packageJson,
    devDependencies: {
      ...packageJson.devDependencies,
      'sass-loader': 'latest',
    },
  };

  return config;
}

function fileLoader() {
  const config = {
    ...packageJson,
    devDependencies: {
      ...packageJson.devDependencies,
      'file-loader': '^6.2.0',
    },
  };

  return config;
}

function jest(transpiler: Options['transpiler']) {
  let config = {
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

  if (transpiler?.includes('babel')) {
    config = {
      ...config,
      devDependencies: {
        ...config.devDependencies,
        'babel-jest': 'latest',
      },
    };
  }

  if (transpiler?.includes('ts')) {
    config = {
      ...config,
      devDependencies: {
        ...config.devDependencies,
        'ts-jest': 'latest',
        '@types/jest': 'latest',
      },
    };
  }

  return config;
}

function vitest(lib: Options['lib']) {
  let config = {
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

  if (lib === 'react') {
    config = {
      ...config,
      devDependencies: {
        ...config.devDependencies,
        jsdom: 'latest',
        '@vitejs/plugin-react': 'latest',
      },
    };
  }

  return config;
}

function esLint(transpiler: Options['transpiler']) {
  const config = {
    ...packageJson,
    scripts: {
      ...packageJson.scripts,
      lint: `eslint 'src/**/*.{${getExtensions(transpiler).join(',')}}'`,
      'lint:fix': `eslint --fix 'src/**/*.{${getExtensions(transpiler).join(',')}}}'`,
    },
    devDependencies: {
      ...packageJson.devDependencies,
      eslint: 'latest',
    },
  };
  return config;
}

function prettier(transpiler: Options['transpiler']) {
  const config = {
    ...packageJson,
    scripts: {
      ...packageJson.scripts,
      format: `prettier --write 'src/**/*.{${getExtensions(transpiler).join(',')}}'`,
    },
    devDependencies: {
      ...packageJson.devDependencies,
      prettier: 'latest',
    },
  };
  return config;
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
  let config = {
    ...packageJson,
  };

  if (options.name) {
    config = {
      ...config,
      name: options.name,
    };
  }

  if (options.bundler === 'webpack') {
    config = {
      ...config,
      ...webpack(options.plugins),
    };
  }

  if (options.lib === 'react') {
    config = {
      ...config,
      ...react(),
    };
  }

  if (options.lib === 'svelte') {
    config = {
      ...config,
      ...svelte(),
    };
  }

  if (options.lib === 'vue') {
    config = {
      ...config,
      ...vue(),
    };
  }

  if (options.transpiler?.includes('babel')) {
    config = {
      ...config,
      ...babel(options.lib),
    };
  }

  if (options.transpiler?.includes('ts')) {
    config = {
      ...config,
      ...typescript(),
    };
  }

  if (options.ui?.includes('tailwind')) {
    config = {
      ...config,
      ...tailwind(),
    };
  }

  if (options.ui?.includes('material-ui')) {
    config = {
      ...config,
      ...materialUi(),
    };
  }

  if (options.styling) {
    config = {
      ...config,
      ...cssStyleLoader(),
    };

    if (options.styling.includes('less')) {
      config = {
        ...config,
        ...less(),
      };
    }

    if (options.styling.includes('scss')) {
      config = {
        ...config,
        ...scss(),
      };
    }
  }

  if (options.image) {
    config = {
      ...config,
      ...fileLoader(),
    };

    if (options.testing?.includes('jest')) {
      config = {
        ...config,
        ...jest(options.transpiler),
      };
    }

    if (options.testing?.includes('vitest')) {
      config = {
        ...config,
        ...vitest(options.lib),
      };
    }

    if (options.linting?.includes('eslint')) {
      config = {
        ...config,
        ...esLint(options.transpiler),
      };
    }

    if (options.linting?.includes('prettier')) {
      config = {
        ...config,
        ...prettier(options.transpiler),
      };
    }

    const dependencies = Object.keys(config.dependencies)
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

    const devDependencies = Object.keys(config.devDependencies)
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

    config = {
      ...config,
      dependencies,
      devDependencies,
    };

    return JSON.stringify(config, null, 2);
  }
}
