import type { Options, ViteConfig } from '../types';
import { objectLiteralToString } from './object-literals-to-string';

export function buildViteConfig(options: Options) {
  let config: ViteConfig = {};

  if (options.lib === 'react') {
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
