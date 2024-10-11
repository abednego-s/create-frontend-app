import { objectLiteralToString } from '../object-literal-to-string';
import { Options } from '../../types';

export function buildTailwindConfig(options: Options) {
  const { transpiler } = options;
  const useTypescript = transpiler?.includes('ts');

  let extensions = ['js', 'jsx', 'html'].join(',');

  if (useTypescript) {
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
