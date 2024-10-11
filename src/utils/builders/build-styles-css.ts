import { stripIndent, stripIndents } from 'common-tags';
import { Options } from '../../types';

export function buildStylesCss(options: Options) {
  const { ui } = options;
  const useTailwind = ui?.includes('tailwind') ?? false;

  if (useTailwind) {
    return stripIndents`
      @import 'tailwindcss/base';
      @import 'tailwindcss/components';
      @import 'tailwindcss/utilities';
    `;
  }

  return stripIndent`
    h1 { 
      color: white; 
      background-color: black;
    }
  `;
}
