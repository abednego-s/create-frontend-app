import { stripIndent } from 'common-tags';

export function buildPostCssConfig() {
  return stripIndent`
    module.exports = {
      plugins: [ 
        require('tailwindcss'), 
        require('autoprefixer')
      ],
    };
  `;
}
