import { Options } from '../../types';

export type TSConfig = {
  compilerOptions: {
    target: string;
    module: string;
    moduleResolution: string;
    strict: boolean;
    esModuleInterop: boolean;
    skipLibCheck: boolean;
    forceConsistentCasingInFileNames: boolean;
    noImplicitAny: boolean;
    jsx?: string;
    allowSyntheticDefaultImports?: boolean;
    types?: string[];
    plugins?: Record<string, string>[];
  };
  include: string[];
  exclude: string[];
  extends?: string;
};

export function buildTypescriptConfig(options: Options) {
  const { lib, styling } = options;
  const useReact = lib === 'react';
  const useSvelte = lib === 'svelte';
  const useCssModule = styling?.includes('css-module');

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

  if (useReact) {
    config.compilerOptions = {
      ...config.compilerOptions,
      jsx: 'react-jsx',
    };
  }

  if (useSvelte) {
    config.compilerOptions = {
      ...config.compilerOptions,
      allowSyntheticDefaultImports: true,
      types: ['svelte'],
    };
    config.include = ['src/**/*', 'src/**/*.svelte'];
    config.extends = '@tsconfig/svelte/tsconfig.json';
  }

  if (useCssModule) {
    const cssModuleTsPlugin = [{ name: 'typescript-plugin-css-modules' }];
    config.compilerOptions = {
      ...config.compilerOptions,
      plugins: config.compilerOptions.plugins
        ? [...config.compilerOptions.plugins, ...cssModuleTsPlugin]
        : cssModuleTsPlugin,
    };
  }

  return JSON.stringify(config, null, 2);
}
