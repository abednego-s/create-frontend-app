import { stripIndent, stripIndents } from 'common-tags';
import { objectLiteralToString } from '../object-literal-to-string';
import { Options } from '../../types';

export type VitestConfig = {
  plugins?: string[];
  test?: {
    environment: string;
  };
};

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

  const template = stripIndent`
    ${stripIndents`
      import { defineConfig } from 'vite'
      import react from '@vitejs/plugin-react'  
    `}
    \nexport default defineConfig(${objectLiteralToString(config)})
  `;

  return template;
}
