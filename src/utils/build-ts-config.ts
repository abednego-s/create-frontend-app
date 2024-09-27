import type { Options, TSConfig } from '../types';

export function buildTypescriptConfig(options: Options) {
  let config: TSConfig = {
    compilerOptions: {
      target: 'ES2015',
      module: 'ES6',
      moduleResolution: 'node',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      noImplicitAny: true,
    },
    include: ['src/**/*'],
    exclude: ['node_modules'],
  };

  if (options.lib === 'react') {
    config = {
      ...config,
      compilerOptions: {
        ...config.compilerOptions,
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
