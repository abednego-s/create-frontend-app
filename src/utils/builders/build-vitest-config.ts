import { Options, VitestConfig } from '../../types';
import { objectLiteralToString } from '../object-literals-to-string';

export function buildVitestConfig(options: Options) {
  const { lib } = options;
  const isReact = lib === 'react';

  let config: VitestConfig = {};

  if (isReact) {
    config = {
      ...config,
      plugins: ['[code]react()[/code]'],
      test: {
        ...config.test,
        environment: 'jsdom',
      },
    };
  }

  const template = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(${objectLiteralToString(config)})`;

  return template;
}
