import { getExtensions } from '../get-extensions';
import { sortByKeys } from '../sort-by-keys';
import { getLatestVersion } from '../get-package-versions';
import { Options } from '../../types';

export type PackageConfig = {
  name?: string;
  version: string;
  description?: string;
  main?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  engines?: Record<string, string>;
  browserslist?: string[];
  keywords?: string[];
  author?: string;
  license?: string;
  repository?: string;
  bugs?: string;
  homepage?: string;
  config?: Record<string, unknown>;
  workspaces?: string[];
  private?: boolean;
};

// eslint-disable-next-line no-unused-vars
async function applyWebpack(this: PackageConfig) {
  this.scripts = {
    ...this.scripts,
    build: 'webpack --mode production',
  };

  this.devDependencies = {
    ...this.devDependencies,
    webpack: await getLatestVersion('webpack'),
    'webpack-cli': await getLatestVersion('webpack-cli'),
  };

  // async function foo(plugins: Options['plugins']) {
  //   return plugins?.reduce(async (prev, current) => {
  //     if (current !== 'HotModuleReplacementPlugin') {
  //       prev = {
  //         ...prev,
  //         [current]: await getLatestVersion(current as RegisteredPackage),
  //       };
  //     }

  //     return prev;
  //   }, {});
  // }

  // if (plugins) {
  //   const webpackPlugins = await foo(plugins);

  //   this.devDependencies = {
  //     ...this.devDependencies,
  //     ...webpackPlugins,
  //   };
  // }
}

// eslint-disable-next-line no-unused-vars
async function applyParcel(this: PackageConfig) {
  this.scripts = {
    ...this.scripts,
    start: 'parcel src/index.html',
    build: 'parcel build src/index.html',
  };
  this.devDependencies = {
    ...this.devDependencies,
    parcel: await getLatestVersion('parcel'),
  };
}

async function applyRollup(
  this: PackageConfig,
  {
    useBabel,
    useTypescript,
    useSvelte,
    useCss,
    hasImages,
    hasFonts,
  }: {
    useBabel: boolean;
    useTypescript: boolean;
    useSvelte: boolean;
    useCss: boolean;
    hasImages: boolean;
    hasFonts: boolean;
  }
) {
  this.scripts = {
    ...this.scripts,
    build: 'rollup -c',
    dev: 'rollup -c -w',
  };
  this.devDependencies = {
    ...this.devDependencies,
    rollup: await getLatestVersion('rollup'),
    '@rollup/plugin-node-resolve': await getLatestVersion(
      '@rollup/plugin-node-resolve'
    ),
    '@rollup/plugin-commonjs': await getLatestVersion(
      '@rollup/plugin-commonjs'
    ),
    'rollup-plugin-terser': await getLatestVersion('rollup-plugin-terser'),
  };

  if (useBabel) {
    this.devDependencies = {
      ...this.devDependencies,
      '@rollup/plugin-babel': await getLatestVersion('@rollup/plugin-babel'),
    };
  }

  if (useTypescript) {
    this.devDependencies = {
      ...this.devDependencies,
      '@rollup/plugin-typescript': await getLatestVersion(
        '@rollup/plugin-typescript'
      ),
    };
  }

  if (useSvelte) {
    this.devDependencies = {
      ...this.devDependencies,
      'rollup-plugin-svelte': await getLatestVersion('rollup-plugin-svelte'),
      'rollup-plugin-css-only': await getLatestVersion(
        'rollup-plugin-css-only'
      ),
    };
  }

  if (useCss) {
    this.devDependencies = {
      ...this.devDependencies,
      'rollup-plugin-postcss': await getLatestVersion('rollup-plugin-postcss'),
      postcss: await getLatestVersion('postcss'),
    };
  }

  if (hasImages || hasFonts) {
    this.devDependencies = {
      ...this.devDependencies,
      '@rollup/plugin-url': await getLatestVersion('@rollup/plugin-url'),
    };
  }
}

async function applyReact(
  this: PackageConfig,
  { isWebpack }: { isWebpack: boolean }
) {
  if (isWebpack) {
    this.scripts = {
      ...this.scripts,
      dev: 'webpack serve --mode development',
    };
  }
  this.dependencies = {
    ...this.dependencies,
    react: await getLatestVersion('react'),
    'react-dom': await getLatestVersion('react-dom'),
  };

  if (isWebpack) {
    this.devDependencies = {
      ...this.devDependencies,
      'webpack-dev-server': await getLatestVersion('webpack-dev-server'),
    };
  }
}

async function applySvelte(
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
      'svelte-loader': await getLatestVersion('svelte-loader'),
      'svelte-preprocess': await getLatestVersion('svelte-preprocess'),
      'webpack-dev-server': await getLatestVersion('webpack-dev-server'),
    };
  }

  if (isParcel) {
    this.devDependencies = {
      ...this.devDependencies,
      '@parcel/transformer-svelte': await getLatestVersion(
        '@parcel/transformer-svelte'
      ),
    };
  }

  this.devDependencies = {
    ...this.devDependencies,
    svelte: await getLatestVersion('svelte'),
  };
}

async function applyVue(
  this: PackageConfig,
  {
    isWebpack,
    isParcel,
    isRollup,
    useCss,
  }: {
    isWebpack: boolean;
    isParcel: boolean;
    isRollup: boolean;
    useCss: boolean;
  }
) {
  if (isWebpack) {
    this.scripts = {
      ...this.scripts,
      dev: 'webpack serve --mode development',
    };
    this.devDependencies = {
      ...this.devDependencies,
      vue: await getLatestVersion('vue'),
      'vue-loader': await getLatestVersion('vue-loader'),
      'vue-template-compiler': await getLatestVersion('vue-template-compiler'),
      'webpack-dev-server': await getLatestVersion('webpack-dev-server'),
    };

    if (useCss) {
      this.devDependencies = {
        ...this.devDependencies,
        'vue-style-loader': await getLatestVersion('vue-style-loader'),
      };
    }
  }

  if (isParcel) {
    this.scripts = {
      ...this.scripts,
    };

    this.devDependencies = {
      ...this.devDependencies,
      '@parcel/transformer-vue': await getLatestVersion(
        '@parcel/transformer-vue'
      ),
    };
  }

  if (isRollup) {
    this.devDependencies = {
      ...this.devDependencies,
      'rollup-plugin-vue': await getLatestVersion('rollup-plugin-vue'),
    };
  }
}

async function applyBabel(
  this: PackageConfig,
  { isWebpack, useReact }: { isWebpack: boolean; useReact: boolean }
) {
  this.devDependencies = {
    ...this.devDependencies,
    '@babel/core': await getLatestVersion('@babel/core'),
    '@babel/preset-env': await getLatestVersion('@babel/preset-env'),
  };

  if (useReact) {
    this.devDependencies = {
      ...this.devDependencies,
      '@babel/preset-react': await getLatestVersion('@babel/preset-react'),
    };
  }

  if (isWebpack) {
    this.devDependencies = {
      ...this.devDependencies,
      'babel-loader': await getLatestVersion('babel-loader'),
    };
  }
}

async function applyTypescript(
  this: PackageConfig,
  {
    isWebpack,
    useBabel,
    useReact,
  }: { isWebpack: boolean; useBabel: boolean; useReact: boolean }
) {
  this.devDependencies = {
    ...this.devDependencies,
    typescript: await getLatestVersion('typescript'),
  };

  if (useReact) {
    this.devDependencies = {
      ...this.devDependencies,
      '@types/react': await getLatestVersion('@types/react'),
      '@types/react-dom': await getLatestVersion('@types/react-dom'),
    };
  }

  if (isWebpack) {
    this.devDependencies = {
      ...this.devDependencies,
      'ts-loader': await getLatestVersion('ts-loader'),
    };
  }

  if (useBabel) {
    this.devDependencies = {
      ...this.devDependencies,
      '@babel/preset-typescript': await getLatestVersion(
        '@babel/preset-typescript'
      ),
    };
  }
}

// eslint-disable-next-line no-unused-vars
async function applyTailwind(this: PackageConfig) {
  this.devDependencies = {
    ...this.devDependencies,
    tailwindcss: await getLatestVersion('tailwindcss'),
    autoprefixer: await getLatestVersion('autoprefixer'),
    postcss: await getLatestVersion('postcss'),
    'postcss-loader': await getLatestVersion('postcss-loader'),
  };
}

// eslint-disable-next-line no-unused-vars
async function applyMaterialUi(this: PackageConfig) {
  this.dependencies = {
    ...this.dependencies,
    '@mui/material': await getLatestVersion('@mui/material'),
    '@emotion/react': await getLatestVersion('@emotion/react'),
    '@emotion/styled': await getLatestVersion('@emotion/styled'),
  };
}

async function applyCss(
  this: PackageConfig,
  { isWebpack }: { isWebpack: boolean }
) {
  if (isWebpack) {
    this.devDependencies = {
      ...this.devDependencies,
      'css-loader': await getLatestVersion('css-loader'),
      'style-loader': await getLatestVersion('style-loader'),
    };
  }
}

async function applyCssModule(
  this: PackageConfig,
  { isWebpack }: { isWebpack: boolean }
) {
  if (isWebpack) {
    this.devDependencies = {
      ...this.devDependencies,
      'css-loader': await getLatestVersion('css-loader'),
      'style-loader': await getLatestVersion('style-loader'),
    };
  }
}

async function applyLess(
  this: PackageConfig,
  { isWebpack }: { isWebpack: boolean }
) {
  if (isWebpack) {
    this.devDependencies = {
      ...this.devDependencies,
      'css-loader': await getLatestVersion('css-loader'),
      'style-loader': await getLatestVersion('style-loader'),
    };
  }
  this.devDependencies = {
    ...this.devDependencies,
    less: await getLatestVersion('less'),
  };
}

async function applySass(
  this: PackageConfig,
  { isWebpack }: { isWebpack: boolean }
) {
  if (isWebpack) {
    this.devDependencies = {
      ...this.devDependencies,
      'css-loader': await getLatestVersion('css-loader'),
      'style-loader': await getLatestVersion('style-loader'),
      'sass-loader': await getLatestVersion('sass-loader'),
    };
  } else {
    this.devDependencies = {
      ...this.devDependencies,
      sass: await getLatestVersion('sass'),
    };
  }
}

async function applyFileLoader(
  this: PackageConfig,
  { isWebpack }: { isWebpack: boolean }
) {
  if (isWebpack) {
    this.devDependencies = {
      ...this.devDependencies,
      'file-loader': await getLatestVersion('file-loader'),
    };
  }
}

async function applyJest(
  this: PackageConfig,
  {
    useBabel,
    useCssModule,
    useTypescript,
  }: { useBabel: boolean; useCssModule: boolean; useTypescript: boolean }
) {
  this.scripts = {
    ...this.scripts,
    test: 'jest',
  };

  this.devDependencies = {
    ...this.devDependencies,
    jest: await getLatestVersion('jest'),
  };

  if (useBabel) {
    this.devDependencies = {
      ...this.devDependencies,
      'babel-jest': await getLatestVersion('babel-jest'),
    };
  }

  if (useTypescript) {
    this.devDependencies = {
      ...this.devDependencies,
      'ts-jest': await getLatestVersion('ts-jest'),
      '@types/jest': await getLatestVersion('@types/jest'),
    };
  }

  if (useCssModule) {
    this.devDependencies = {
      ...this.devDependencies,
      'identity-obj-proxy': await getLatestVersion('identity-obj-proxy'),
    };
  }
}

async function applyVitest(
  this: PackageConfig,
  {
    useReact,
    useSvelte,
    useVue,
  }: { useReact: boolean; useSvelte: boolean; useVue: boolean }
) {
  this.scripts = {
    ...this.scripts,
    test: 'vitest',
  };

  this.devDependencies = {
    ...this.devDependencies,
    vitest: await getLatestVersion('vitest'),
  };

  if (useReact) {
    this.devDependencies = {
      ...this.devDependencies,
      jsdom: await getLatestVersion('jsdom'),
      '@vitejs/plugin-react': await getLatestVersion('@vitejs/plugin-react'),
    };
  }

  if (useSvelte) {
    this.devDependencies = {
      ...this.devDependencies,
      jsdom: await getLatestVersion('jsdom'),
      '@sveltejs/vite-plugin-svelte': await getLatestVersion(
        '@sveltejs/vite-plugin-svelte'
      ),
    };
  }

  if (useVue) {
    this.devDependencies = {
      ...this.devDependencies,
      jsdom: await getLatestVersion('jsdom'),
      '@vitejs/plugin-vue': await getLatestVersion('@vitejs/plugin-vue'),
    };
  }
}

async function applyEsLint(
  this: PackageConfig,
  {
    useBabel,
    useTypescript,
    useReact,
    useSvelte,
  }: {
    useBabel: boolean;
    useTypescript: boolean;
    useReact: boolean;
    useSvelte: boolean;
  }
) {
  const options = {
    useBabel,
    useTypescript,
  };

  this.scripts = {
    ...this.scripts,
    lint: `eslint 'src/**/*.{${getExtensions(options).join(',')}}'`,
    'lint:fix': `eslint --fix 'src/**/*.{${getExtensions(options).join(',')}}}'`,
  };

  this.devDependencies = {
    ...this.devDependencies,
    eslint: await getLatestVersion('eslint'),
    'eslint-config-prettier': await getLatestVersion('eslint-config-prettier'),
  };

  if (useReact) {
    this.devDependencies = {
      ...this.devDependencies,
      'eslint-plugin-react': await getLatestVersion('eslint-plugin-react'),
      'eslint-plugin-react-hooks': await getLatestVersion(
        'eslint-plugin-react-hooks'
      ),
    };
  }

  if (useSvelte) {
    this.devDependencies = {
      ...this.devDependencies,
      'eslint-plugin-svelte3': await getLatestVersion('eslint-plugin-svelte3'),
    };
  }

  if (useTypescript) {
    this.devDependencies = {
      ...this.devDependencies,
      '@typescript-eslint/parser': await getLatestVersion(
        '@typescript-eslint/parser'
      ),
      '@typescript-eslint/eslint-plugin': await getLatestVersion(
        '@typescript-eslint/eslint-plugin'
      ),
    };
  }
}

async function applyPrettier(
  this: PackageConfig,
  { useBabel, useTypescript }: { useBabel: boolean; useTypescript: boolean }
) {
  const options = {
    useBabel,
    useTypescript,
  };

  this.scripts = {
    ...this.scripts,
    format: `prettier --write 'src/**/*.{${getExtensions(options).join(',')}}'`,
  };

  this.devDependencies = {
    ...this.devDependencies,
    prettier: await getLatestVersion('prettier'),
  };
}

export async function buildPackageJson(options: Options) {
  const {
    bundler,
    image,
    font,
    lib,
    linting,
    name,
    styling,
    testing,
    transpiler,
    ui,
  } = options;

  const useBabel = transpiler?.includes('babel') ?? false;
  const useTypescript = transpiler?.includes('ts') ?? false;
  const useReact = lib === 'react';
  const useSvelte = lib === 'svelte';
  const useVue = lib === 'vue';
  const isParcel = bundler === 'parcel';
  const isWebpack = bundler === 'webpack';
  const isRollup = bundler === 'rollup';
  const useTailwind = ui?.includes('tailwind') ?? false;
  const useMaterialUi = ui?.includes('material-ui') ?? false;
  const useCss = styling?.includes('css') ?? false;
  const useCssModule = styling?.includes('css-module') ?? false;
  const useLess = styling?.includes('less') ?? false;
  const useSass = styling?.includes('scss') ?? false;
  const useJest = testing?.includes('jest') ?? false;
  const useVitest = testing?.includes('vitest') ?? false;
  const useEslint = linting?.includes('eslint') ?? false;
  const usePrettier = linting?.includes('prettier') ?? false;

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
    await applyWebpack.call(packageJson);
  }

  if (isParcel) {
    await applyParcel.call(packageJson);
  }

  if (isRollup) {
    await applyRollup.call(packageJson, {
      useBabel,
      useTypescript,
      useSvelte,
      useCss,
      hasImages: !!image,
      hasFonts: !!font,
    });
  }

  if (useReact) {
    await applyReact.call(packageJson, { isWebpack });
  }

  if (useSvelte) {
    await applySvelte.call(packageJson, { isWebpack, isParcel });
  }

  if (useVue) {
    await applyVue.call(packageJson, { isWebpack, isParcel, isRollup, useCss });
  }

  if (useBabel) {
    await applyBabel.call(packageJson, { isWebpack, useReact });
  }

  if (useTypescript) {
    await applyTypescript.call(packageJson, {
      useBabel,
      useReact,
      isWebpack,
    });
  }

  if (useTailwind) {
    await applyTailwind.call(packageJson);
  }

  if (useMaterialUi) {
    await applyMaterialUi.call(packageJson);
  }

  if (useCss) {
    await applyCss.call(packageJson, { isWebpack });
  }

  if (useCssModule) {
    await applyCssModule.call(packageJson, { isWebpack });
  }

  if (useLess) {
    await applyLess.call(packageJson, { isWebpack });
  }

  if (useSass) {
    await applySass.call(packageJson, { isWebpack });
  }

  if (image) {
    await applyFileLoader.call(packageJson, { isWebpack });
  }

  if (useJest) {
    await applyJest.call(packageJson, {
      useBabel,
      useCssModule,
      useTypescript,
    });
  }

  if (useVitest) {
    await applyVitest.call(packageJson, { useReact, useSvelte, useVue });
  }

  if (useEslint) {
    await applyEsLint.call(packageJson, {
      useBabel,
      useReact,
      useSvelte,
      useTypescript,
    });
  }

  if (usePrettier) {
    await applyPrettier.call(packageJson, {
      useBabel,
      useTypescript,
    });
  }

  const dependencies = sortByKeys<
    Record<keyof PackageConfig['dependencies'], string>
  >(packageJson.dependencies || {});

  const devDependencies = sortByKeys<
    Record<keyof PackageConfig['devDependencies'], string>
  >(packageJson.devDependencies || {});

  packageJson.devDependencies = devDependencies;
  packageJson.dependencies = dependencies;

  return JSON.stringify(packageJson, null, 2);
}
