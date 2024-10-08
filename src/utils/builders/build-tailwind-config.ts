import { objectLiteralToString } from '../object-literal-to-string';
import { Options } from '../../types';

export function buildTailwindConfig(options: Options) {
  const { transpiler } = options;
  const isTypescript = transpiler?.includes('ts');

  let extensions = ['js', 'jsx', 'html'].join(',');

  if (isTypescript) {
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
