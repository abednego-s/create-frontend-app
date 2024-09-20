import { objectLiteralToString } from './object-literals-to-string';
import type { Options } from '../types';

export function buildTailwindConfig(options: Options) {
  let exts = ['js', 'jsx', 'html'].join(',');

  if (options.transpiler?.includes('ts')) {
    exts = ['ts', 'tsx', 'html'].join(',');
  }

  const config = {
    content: [`./src/**/*.{${exts}}`],
    theme: {
      extend: {},
    },
    plugins: [],
  };

  return `module.exports =  ${objectLiteralToString(config)}`;
}
