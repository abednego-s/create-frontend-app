import { Options, TSConfig } from '../../types';

export function buildTypescriptConfig(options: Options) {
  const { lib } = options;
  const isReact = lib === 'react';
  const isSvelte = lib === 'svelte';

  const config: TSConfig = {
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

  if (isReact) {
    config.compilerOptions = {
      ...config.compilerOptions,
      jsx: 'react-jsx',
    };
  }

  if (isSvelte) {
    config.compilerOptions = {
      ...config.compilerOptions,
      allowSyntheticDefaultImports: true,
      types: ['svelte'],
    };
    config.include = ['src/**/*', 'src/**/*.svelte'];
  }

  return JSON.stringify(config, null, 2);
}
