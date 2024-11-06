import { html, stripIndent } from 'common-tags';
import { Options } from '../../types';

export function buildHtml(options: Options) {
  const { bundler, transpiler, styling, lib } = options;

  const useCss = styling?.includes('css') ?? false;
  const useTypescript = transpiler?.includes('ts') ?? false;
  const isParcel = bundler === 'parcel';
  const isRollup = bundler === 'rollup';
  const useVue = lib === 'vue';
  const useReact = lib === 'react';
  const useSvelte = lib === 'svelte';

  let scriptTag = '';
  let linkTag = '';

  if (isParcel) {
    const extension = useTypescript
      ? useReact
        ? 'tsx'
        : 'ts'
      : useReact
        ? 'jsx'
        : 'js';

    scriptTag = `<script src="./index.${extension}"></script>`;

    if (useReact || useSvelte || useVue) {
      scriptTag = `<script src="./index.${extension}" type="module"></script>`;
    }
  }

  if (isRollup) {
    scriptTag = '<script src="bundle.js"></script>';

    if (useCss || useVue) {
      linkTag = '<link rel="stylesheet" href="bundle.css">';
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
