import { objectLiteralToString } from '../object-literals-to-string';
import type { Options } from '../../types';

export function buildTailwindConfig(options: Options) {
  let extensions = ['js', 'jsx', 'html'].join(',');

  if (options.transpiler?.includes('ts')) {
    extensions = ['ts', 'tsx', 'html'].join(',');
  }

  const config = {
    content: [`./src/**/*.{${extensions}}`],
    theme: {
      extend: {},
    },
    plugins: [],
  };

  return `module.exports =  ${objectLiteralToString(config)}`;
}
