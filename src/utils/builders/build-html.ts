import type { Options } from '../../types';

export function buildHtml(options: Options) {
  let scriptTag = '';

  if (options.bundler === 'parcel') {
    const extension = options.transpiler?.includes('ts') ? 'ts' : 'js';
    scriptTag = `<script src="./index.${extension}"></script>`;
  }

  const output = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Empty Poject</title>
  </head>
  <body>
    <div id="root"></div>${scriptTag ? `\n\t${scriptTag}` : ''}
  </body>
</html>`;

  return output;
}
