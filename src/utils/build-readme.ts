import type { Options } from '../types';

export function buildReadme(options: Options) {
  let output = `# empty-project
  
Empty project.

## Building and running on localhost

First install dependencies:

\`\`\`sh
npm install
\`\`\`
  `;

  if (options.lib === 'react') {
    output += `
To run locally:

\`\`\`sh
npm run dev
\`\`\`
    `;
  }

  output += `
To create a production build:

\`\`\`sh
npm run build:prod
\`\`\`

To create a development build:

\`\`\`sh
npm run build:dev
\`\`\``;

  return output;
}
