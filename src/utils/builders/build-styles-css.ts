import { Options } from '../../types';

export function buildStylesCss(options: Options) {
  const { ui } = options;
  const isTailwind = ui?.includes('tailwind') ?? false;

  if (isTailwind) {
    return `@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
`;
  }

  return `h1 { 
  color: white; 
  background-color: black;
}`;
}
