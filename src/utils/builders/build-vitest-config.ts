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
  const isSvelte = lib === 'svelte';
  const isVue = lib === 'vue';

  const config: VitestConfig = {
    test: {
      environment: 'jsdom',
    },
  };

  const imports = new Map();
  imports.set('{ defineConfig }', 'vitest/config');

  if (isReact) {
    imports.set('react', '@vitejs/plugin-react');

    const reactEntry = ['[code]react()[/code]'];
    config.plugins = config.plugins
      ? [...config.plugins, ...reactEntry]
      : reactEntry;
  }

  if (isSvelte) {
    imports.set('{ svelte }', '@sveltejs/vite-plugin-svelte');

    const svelteEntry = ['[code]svelte()[/code]'];
    config.plugins = config.plugins
      ? [...config.plugins, ...svelteEntry]
      : svelteEntry;
  }

  if (isVue) {
    imports.set('vue', '@vitejs/plugin-vue');

    const vueEntry = ['[code]vue()[/code]'];
    config.plugins = config.plugins
      ? [...config.plugins, ...vueEntry]
      : vueEntry;
  }

  let allImports = '';

  imports.forEach((value, key) => {
    allImports += `import ${key} from '${value}';\n`;
  });

  const template = stripIndent`
    ${stripIndents`
      ${allImports}
    `}
    \nexport default defineConfig(${objectLiteralToString(config)})
  `;

  return template;
}
