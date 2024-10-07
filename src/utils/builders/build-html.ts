import { Options } from '../../types';

export function buildHtml(options: Options) {
  const { bundler, transpiler } = options;
  const isParcel = bundler === 'parcel';
  const isTypecript = transpiler?.includes('ts');

  let scriptTag = '';

  if (isParcel) {
    const extension = isTypecript ? 'ts' : 'js';
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
