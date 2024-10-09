import { stripIndents } from 'common-tags';
import { Options } from '../../types';

export function buildReadme(options: Options) {
  const { lib } = options;

  let runLocal = '';

  if (lib) {
    runLocal = `
      To run locally:

      \`\`\`sh
      npm run dev
      \`\`\`
    `;
  }

  return stripIndents`
    # empty-project
  
    Empty project.

    ## Building and running on localhost

    First install dependencies:

    \`\`\`sh
    npm install
    \`\`\`
    ${runLocal}
    To create a production build:

    \`\`\`sh
    npm run build
    \`\`\``;
}
