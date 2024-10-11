import { html, stripIndent } from 'common-tags';
import { Options } from '../../types';

export function buildHtml(options: Options) {
  const { bundler, transpiler, styling } = options;

  const useCss = styling?.includes('css') ?? false;
  const isParcel = bundler === 'parcel';
  const isRollup = bundler === 'rollup';
  const isTypecript = transpiler?.includes('ts') ?? false;

  let scriptTag = '';
  let linkTag = '';

  if (isParcel) {
    const extension = isTypecript ? 'ts' : 'js';
    scriptTag = `<script src="./index.${extension}"></script>`;
  }

  if (isRollup) {
    scriptTag = '<script src="./dist/bundle.js"></script>';

    if (useCss) {
      linkTag = '<link rel="stylesheet" href="/.dist/bundle.css">';
    }
  }

  const tags = stripIndent`
    ${scriptTag} 
    ${linkTag}
  `;

  const output = html`
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Empty Project</title>
      </head>
      <body>
        <div id="root"></div>
        ${tags}
      </body>
    </html>
  `;

  return output;
}
