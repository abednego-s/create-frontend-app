import type { Options } from '../types';

export function buildHtml(options: Options) {
  let output = '<!DOCTYPE html>';

  output += `
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Empty Poject</title>
  </head>
  <body>`;

  if (options.lib === 'react') {
    output += '\n\t<div id="root"></div>';
  }

  output += `
  </body>
</html>`;

  return output;
}
