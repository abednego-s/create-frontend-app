import { Options } from '../../types';

export function buildHtml(options: Options) {
  const { bundler, transpiler, styling } = options;
  const isParcel = bundler === 'parcel';
  const isRollup = bundler === 'rollup';
  const isTypecript = transpiler?.includes('ts') ?? false;
  const isCss = styling?.includes('css');

  let scriptTag = '';

  if (isParcel) {
    const extension = isTypecript ? 'ts' : 'js';
    scriptTag = `<script src="./index.${extension}"></script>`;
  }

  if (isRollup) {
    scriptTag = '<script src="./dist/bundle.js"></script>';

    if (isCss) {
      scriptTag += '\n\t<link rel="stylesheet" href="/.dist/bundle.css">';
    }
  }

  const output = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Empty Project</title>
  </head>
  <body>
    <div id="root"></div>${scriptTag ? `\n\t${scriptTag}` : ''}
  </body>
</html>`;

  return output;
}
