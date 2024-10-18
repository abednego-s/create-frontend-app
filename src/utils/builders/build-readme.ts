import { stripIndents } from 'common-tags';

export function buildReadme() {
  return stripIndents`
    # empty-project
  
    Empty project.

    ## Building and running on localhost

    First install dependencies:

    \`\`\`sh
    npm install
    \`\`\`
    
    To run locally:

    \`\`\`sh
    npm run dev
    \`\`\`

    To create a production build:

    \`\`\`sh
    npm run build
    \`\`\``;
}
