import type { Options } from '../types';
import { objectLiteralToString } from './object-literals-to-string';

export function buildViteConfig(options: Options) {
  let config: {
    plugins?: string[];
    test?: {
      environment: string;
    };
  } = {};

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

  const output = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(${objectLiteralToString(config)})`;
  return output;
}
