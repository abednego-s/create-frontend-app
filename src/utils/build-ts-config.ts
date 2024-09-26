import type { Options } from '../types';

type TSConfig = typeof tsConfig & {
  compilerOptions: typeof tsConfig.compilerOptions & {
    allowSyntheticDefaultImports?: boolean;
    jsx?: string;
    types?: string[];
  };
};

const tsConfig = {
  compilerOptions: {
    target: 'ES6',
    module: 'ES6',
    moduleResolution: 'node',
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
  },
  include: ['src/**/*'],
  exclude: ['node_modules'],
};

export function buildTypescriptConfig(options: Options) {
  let config: TSConfig = {
    ...tsConfig,
  };

  if (options.lib === 'react') {
    config = {
      ...tsConfig,
      compilerOptions: {
        ...tsConfig.compilerOptions,
        jsx: 'react-jsx',
      },
    };
  }

  if (options.lib === 'svelte') {
    config = {
      ...config,
      compilerOptions: {
        ...config.compilerOptions,
        allowSyntheticDefaultImports: true,
        types: ['svelte'],
      },
      include: ['src/**/*', 'src/**/*.svelte'],
    };
  }

  return JSON.stringify(config, null, 2);
}
