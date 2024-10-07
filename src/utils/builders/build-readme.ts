import { Options } from '../../types';

export function buildReadme(options: Options) {
  const { lib } = options;

  let runLocal = '';

  if (lib) {
    runLocal = `\nTo run locally:

\`\`\`sh
npm run dev
\`\`\` \n`;
  }

  const output = `# empty-project
  
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

  return output;
}
