import { Options, PackageConfig } from '../../types';
import { getExtensions } from '../get-extensions';
import { sortByKeys } from '../sort-by-keys';

function applyWebpack(this: PackageConfig, plugins: Options['plugins']) {
  this.scripts = {
    ...this.scripts,
    build: 'webpack --mode production',
  };

  this.devDependencies = {
    ...this.devDependencies,
    webpack: '^5.94.0',
    'webpack-cli': '^5.1.4',
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
      ...webpackPlugins,
    };
  }
}

// eslint-disable-next-line no-unused-vars
function applyParcel(this: PackageConfig) {
  this.scripts = {
    ...this.scripts,
    start: 'parcel src/index.html',
    build: 'parcel build src/index.html',
  };
  this.devDependencies = {
    ...this.devDependencies,
    parcel: 'latest',
  };
}

// eslint-disable-next-line no-unused-vars
function applyReact(this: PackageConfig) {
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

function applySvelte(
  this: PackageConfig,
  { isWebpack, isParcel }: { isWebpack: boolean; isParcel: boolean }
) {
  if (isWebpack) {
    this.scripts = {
      ...this.scripts,
      dev: 'webpack serve --mode development',
    };

    this.devDependencies = {
      ...this.devDependencies,
      'svelte-loader': '^3.2.3',
      'svelte-preprocess': '^6.0.2',
      'webpack-dev-server': '^5.1.0',
    };
  }

  if (isParcel) {
    this.devDependencies = {
      ...this.devDependencies,
      '@parcel/transformer-svelte': 'latest',
    };
  }

  this.dependencies = {
    ...this.dependencies,
    svelte: '^4.2.19',
  };
}

function applyVue(
  this: PackageConfig,
  {
    isWebpack,
    isParcel,
    isCss,
  }: { isWebpack: boolean; isParcel: boolean; isCss: boolean }
) {
  if (isWebpack) {
    this.scripts = {
      ...this.scripts,
      dev: 'webpack serve --mode development',
    };
    this.devDependencies = {
      ...this.devDependencies,
      vue: '^3.3.4',
      'vue-loader': '^17.2.4',
      'vue-template-compiler': '^2.7.14',
      'webpack-dev-server': '^5.1.0',
    };

    if (isCss) {
      this.devDependencies = {
        ...this.devDependencies,
        'vue-style-loader': '^7.1.2',
      };
    }
  }

  if (isParcel) {
    this.scripts = {
      ...this.scripts,
      '@parcel/transformer-vue': 'latest',
    };
  }
}

function applyBabel(
  this: PackageConfig,
  { isWebpack, isReact }: { isWebpack: boolean; isReact: boolean }
) {
  this.devDependencies = {
    ...this.devDependencies,
    '@babel/core': '^7.25.2',
    '@babel/preset-env': '^7.25.4',
  };

  if (isReact) {
    this.devDependencies = {
      ...this.devDependencies,
      '@babel/preset-react': '^7.24.7',
    };
  }

  if (isWebpack) {
    this.devDependencies = {
      ...this.devDependencies,
      'babel-loader': '^9.1.3',
    };
  }
}

function applyTypescript(
  this: PackageConfig,
  {
    isWebpack,
    isBabel,
    isReact,
  }: { isWebpack: boolean; isBabel: boolean; isReact: boolean }
) {
  this.devDependencies = {
    ...this.devDependencies,
    typescript: '^5.6.2',
  };

  if (isReact) {
    this.devDependencies = {
      ...this.devDependencies,
      '@types/react': '^18.3.5',
      '@types/react-dom': '^18.3.0',
    };
  }

  if (isWebpack) {
    this.devDependencies = {
      ...this.devDependencies,
      'ts-loader': '^9.5.1',
    };
  }

  if (isBabel) {
    this.devDependencies = {
      ...this.devDependencies,
      '@babel/preset-typescript': 'latest',
    };
  }
}

// eslint-disable-next-line no-unused-vars
function applyTailwind(this: PackageConfig) {
  this.devDependencies = {
    ...this.devDependencies,
    tailwindcss: 'latest',
    autoprefixer: 'latest',
    postcss: 'latest',
    'postcss-loader': 'latest',
  };
}

// eslint-disable-next-line no-unused-vars
function applyMaterialUi(this: PackageConfig) {
  this.dependencies = {
    ...this.dependencies,
    '@mui/material': 'latest',
    '@emotion/react': 'latest',
    '@emotion/styled': 'latest',
  };
}

function applyCss(this: PackageConfig, { isWebpack }: { isWebpack: boolean }) {
  if (isWebpack) {
    this.devDependencies = {
      ...this.devDependencies,
      'css-loader': '^7.1.2',
      'style-loader': '^4.0.0',
    };
  }
}

function applyCssModule(
  this: PackageConfig,
  { isWebpack }: { isWebpack: boolean }
) {
  if (isWebpack) {
    this.devDependencies = {
      ...this.devDependencies,
      'css-loader': '^7.1.2',
      'style-loader': '^4.0.0',
    };
  }
}

function applyLess(this: PackageConfig, { isWebpack }: { isWebpack: boolean }) {
  if (isWebpack) {
    this.devDependencies = {
      ...this.devDependencies,
      'css-loader': '^7.1.2',
      'style-loader': '^4.0.0',
    };
  }
  this.devDependencies = {
    ...this.devDependencies,
    less: 'latest',
  };
}

function applySass(this: PackageConfig, { isWebpack }: { isWebpack: boolean }) {
  if (isWebpack) {
    this.devDependencies = {
      ...this.devDependencies,
      'css-loader': '^7.1.2',
      'style-loader': '^4.0.0',
      'sass-loader': 'latest',
    };
  } else {
    this.devDependencies = {
      ...this.devDependencies,
      sass: 'latest',
    };
  }
}

// eslint-disable-next-line no-unused-vars
function applyFileLoader(this: PackageConfig) {
  this.devDependencies = {
    ...this.devDependencies,
    'file-loader': '^6.2.0',
  };
}

function applyJest(
  this: PackageConfig,
  { isBabel, isTypescript }: { isBabel: boolean; isTypescript: boolean }
) {
  this.scripts = {
    ...this.scripts,
    test: 'jest',
  };

  if (isBabel) {
    this.devDependencies = {
      ...this.devDependencies,
      'babel-jest': 'latest',
    };
  }

  if (isTypescript) {
    this.devDependencies = {
      ...this.devDependencies,
      'ts-jest': 'latest',
      '@types/jest': 'latest',
    };
  }
}

function applyVitest(this: PackageConfig, { isReact }: { isReact: boolean }) {
  this.scripts = {
    ...this.scripts,
    test: 'vitest',
  };

  this.devDependencies = {
    ...this.devDependencies,
    vitest: 'latest',
  };

  if (isReact) {
    this.devDependencies = {
      ...this.devDependencies,
      jsdom: 'latest',
      '@vitejs/plugin-react': 'latest',
    };
  }
}

function applyEsLint(
  this: PackageConfig,
  {
    isBabel,
    isTypescript,
    isReact,
    isSvelte,
  }: {
    isBabel: boolean;
    isTypescript: boolean;
    isReact: boolean;
    isSvelte: boolean;
  }
) {
  const options = {
    isBabel,
    isTypescript,
  };

  this.scripts = {
    ...this.scripts,
    lint: `eslint 'src/**/*.{${getExtensions(options).join(',')}}'`,
    'lint:fix': `eslint --fix 'src/**/*.{${getExtensions(options).join(',')}}}'`,
  };

  this.devDependencies = {
    ...this.devDependencies,
    eslint: 'latest',
    'eslint-config-prettier': 'latest',
  };

  if (isReact) {
    this.devDependencies = {
      ...this.devDependencies,
      'eslint-plugin-react': 'latest',
      'eslint-plugin-react-hooks': 'latest',
    };
  }

  if (isSvelte) {
    this.devDependencies = {
      ...this.devDependencies,
      'eslint-plugin-svelte3': 'latest',
    };
  }

  if (isTypescript) {
    this.devDependencies = {
      ...this.devDependencies,
      '@typescript-eslint/parser': 'latest',
      '@typescript-eslint/eslint-plugin': 'latest',
    };
  }
}

function applyPrettier(
  this: PackageConfig,
  { isBabel, isTypescript }: { isBabel: boolean; isTypescript: boolean }
) {
  const options = {
    isBabel,
    isTypescript,
  };

  this.scripts = {
    ...this.scripts,
    format: `prettier --write 'src/**/*.{${getExtensions(options).join(',')}}'`,
  };

  this.devDependencies = {
    ...this.devDependencies,
    prettier: 'latest',
  };
}

export function buildPackageJson(options: Options) {
  const {
    bundler,
    image,
    lib,
    linting,
    name,
    plugins,
    styling,
    testing,
    transpiler,
    ui,
  } = options;
  const isBabel = transpiler?.includes('babel') ?? false;
  const isTypescript = transpiler?.includes('ts') ?? false;
  const isReact = lib === 'react';
  const isSvelte = lib === 'svelte';
  const isVue = lib === 'vue';
  const isParcel = bundler === 'parcel';
  const isWebpack = bundler === 'webpack';
  const isTailwind = ui?.includes('tailwind') ?? false;
  const isMaterialUi = ui?.includes('material-ui') ?? false;
  const isCss = styling?.includes('css') ?? false;
  const isCssModule = styling?.includes('css-module') ?? false;
  const isLess = styling?.includes('less') ?? false;
  const isSass = styling?.includes('scss') ?? false;
  const isJest = testing?.includes('jest') ?? false;
  const isVitest = testing?.includes('vitest') ?? false;
  const isEslint = linting?.includes('eslint') ?? false;
  const isPrettier = linting?.includes('prettier') ?? false;

  const packageJson: PackageConfig = {
    name: 'empty-project',
    version: '1.0.0',
    description: '',
    main: 'dist/bundle.js',
    keywords: [],
    author: '',
    license: 'ISC',
    scripts: {},
    dependencies: {},
    devDependencies: {},
  };

  if (name) {
    packageJson.name = name;
  }

  if (isWebpack) {
    applyWebpack.call(packageJson, plugins);
  }

  if (isParcel) {
    applyParcel.call(packageJson);
  }

  if (isReact) {
    applyReact.call(packageJson);
  }

  if (isSvelte) {
    applySvelte.call(packageJson, { isWebpack, isParcel });
  }

  if (isVue) {
    applyVue.call(packageJson, { isWebpack, isParcel, isCss });
  }

  if (isBabel) {
    applyBabel.call(packageJson, { isWebpack, isReact });
  }

  if (isTypescript) {
    applyTypescript.call(packageJson, {
      isBabel,
      isReact,
      isWebpack,
    });
  }

  if (isTailwind) {
    applyTailwind.call(packageJson);
  }

  if (isMaterialUi) {
    applyMaterialUi.call(packageJson);
  }

  if (isCss) {
    applyCss.call(packageJson, { isWebpack });
  }

  if (isCssModule) {
    applyCssModule.call(packageJson, { isWebpack });
  }

  if (isLess) {
    applyLess.call(packageJson, { isWebpack });
  }

  if (isSass) {
    applySass.call(packageJson, { isWebpack });
  }

  if (image) {
    applyFileLoader.call(packageJson);
  }

  if (isJest) {
    applyJest.call(packageJson, { isBabel, isTypescript });
  }

  if (isVitest) {
    applyVitest.call(packageJson, { isReact });
  }

  if (isEslint) {
    applyEsLint.call(packageJson, {
      isBabel,
      isReact,
      isSvelte,
      isTypescript,
    });
  }

  if (isPrettier) {
    applyPrettier.call(packageJson, {
      isBabel,
      isTypescript,
    });
  }

  const dependencies = sortByKeys<
    Record<keyof PackageConfig['dependencies'], string>
  >(packageJson.dependencies || {});

  const devDependencies = sortByKeys<
    Record<keyof PackageConfig['devDependencies'], string>
  >(packageJson.dependencies || {});

  packageJson.devDependencies = devDependencies;
  packageJson.dependencies = dependencies;
  return JSON.stringify(packageJson, null, 2);
}
